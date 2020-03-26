import { queryTask, addTask } from '@/services/api'
import { routerRedux } from 'dva/router';

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
            });
        },
        *appendFetch({payload}, { call, put}) {
            const response = yield call(queryTask, payload);
            yield put({
                type: 'appendTask',
                payload: Array.isArray(response) ? response: [],
            });
        },
        *submit({ payload }, { call, put }) {
            const response = yield call(addTask, payload);
            yield put({
                type: 'queryTask',
                payload: response
            })
            yield put(routerRedux.push('/calculation/task-list'));
        }
    },

    reducers: {
        queryTask(state, action) {
            return {
                ...state,
                task: action.payload
            }
        },
        appendTask(state, action) {
            return {
                ...state,
                task: state.task.concat(action.payload)
            }
        }
    },
}
