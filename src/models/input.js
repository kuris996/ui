import { queryInput } from '@/services/api';

export default {
    namespace: 'input',

    state: {
        list: [],
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryInput, payload);
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