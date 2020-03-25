import { queryFactory, addFactory, removeFactory, updateFactory } from '@/services/api'

export default {
    namespace: 'factory',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryFactory, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addFactory, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeFactory, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateFactory, payload);
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