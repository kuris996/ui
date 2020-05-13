import { queryParams } from '@/services/api';

export default {
    namespace: 'params',

    state: {
        list: [],
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryParams, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            }
        }
    }
}