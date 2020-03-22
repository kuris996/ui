import { queryFob } from '@/services/api'

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