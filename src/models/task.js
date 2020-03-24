import { queryTask } from '@/services/api'

export default {
    namespace: 'task',

    state: {
        task: [],
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryTask, payload);
            yield put({
                type: 'queryTask',
                payload: Array.isArray(response) ? response : [],
            })
        },
    },

    reducers: {
        queryTask(state, action) {
            return {
                ...state,
                task: action.payload
            }
        },
    },
}
