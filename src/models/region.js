import { queryRegion, addRegion, removeRegion, updateRegion } from '@/services/api'

export default {
    namespace: 'region',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryRegion, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addRegion, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeRegion, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateRegion, payload);
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