import { queryFob, addFob, removeFob, updateFob } from '@/services/api'

export default {
    namespace: 'fob',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryFob, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addFob, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeFob, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateFob, payload);
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