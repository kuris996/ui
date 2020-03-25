import { queryLogistics, addLogistics, removeLogistics, updateLogistics } from '@/services/api'

export default {
    namespace: 'logistics',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryLogistics, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addLogistics, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeLogistics, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateLogistics, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    }
}