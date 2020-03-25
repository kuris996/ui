import { queryPerevalkaUpakovka, addPerevalkaUpakovka, removePerevalkaUpakovka, updatePerevalkaUpakovka } from '@/services/api'

export default {
    namespace: 'perevalka_upakovka',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryPerevalkaUpakovka, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addPerevalkaUpakovka, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removePerevalkaUpakovka, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback)
                callback();
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updatePerevalkaUpakovka, payload);
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