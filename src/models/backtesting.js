import { queryBacktesting, addBacktesting, removeBacktesting } from '@/services/api'
import { routerRedux } from 'dva';

export default {
    namespace: 'backtesting',

    state: {
        data: {
            list: [],
            pagination: {},
            filters: {
                status: []
            }
        },
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryBacktesting, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *submit({ payload, callback }, { call, put }) {
            const response = yield call(addBacktesting, payload);
            yield put({
                type: 'save',
                payload: response
            })
            yield put(routerRedux.push('/calculation/backtesting-list'));
            if (callback)
                callback()
        },
        *remove({ payload, callback } , { call, put }) {
            const response = yield call(removeBacktesting, payload);
            yield put({
                type: 'save',
                payload: response
            })
            if (callback)
                callback();
        }
    },

    reducers: {
        save(state, action) {
            if (!action.payload)
                return { ...state }
            else return {
                ...state,
                data: action.payload
            }
        },
    },
}
