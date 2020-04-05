import { queryKit, addKit, removeKit } from '@/services/api'
import { routerRedux } from 'dva';

export default {
    namespace: 'kit',

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
            const response = yield call(queryKit, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *submit({ payload }, { call, put }) {
            const response = yield call(addKit, payload);
            yield put({
                type: 'save',
                payload: response
            })
            yield put(routerRedux.push('/calculation/kit-list'));
        },
        *remove({ payload, callback } , { call, put }) {
            const response = yield call(removeKit, payload);
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
