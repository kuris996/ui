import { queryFakeTaskList } from '@/services/api'

export default {
    namespace: 'taskList',

    state: {
        taskList: [],
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryFakeTaskList, payload);
            yield put({
                type: 'queryTaskList',
                payload: Array.isArray(response) ? response : [],
            })
        },
    },

    reducers: {
        queryTaskList(state, action) {
            return {
                ...state,
                taskList: action.payload
            }
        },
    },
}
