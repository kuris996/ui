import { queryKit, addKit, removeKit } from '@/services/api'
import { routerRedux } from 'dva';

export default {
    namespace: 'kit',

    state: {
        data: {
            list: [],
            pagination: {},
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
            yield put(routerRedux.push('/kit/kit-list'));
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
            return {
                ...state,
                kit: action.payload
            }
        },
    },
}
