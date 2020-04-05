import { queryTask, addTask, removeTask } from '@/services/api'
import { routerRedux } from 'dva';

export default {
    namespace: 'task',

    state: {
        data: {
            list: [],
            pagination: {},
            filters: {
                status: []
            }
        },
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryTask, payload);
            yield put({
                type: 'queryTask',
                payload: response,
            });
        },
        *appendFetch({payload}, { call, put}) {
            const response = yield call(queryTask, payload);
            yield put({
                type: 'appendTask',
                payload: response,
            });
        },
        *submit({ payload }, { call, put }) {
            const response = yield call(addTask, payload);
            yield put({
                type: 'queryTask',
                payload: response
            })
            yield put(routerRedux.push('/calculation/task-list'));
        },
        *remove({ payload, callback } , { call, put }) {
            const response = yield call(removeTask, payload);
            yield put({
                type: 'queryTask',
                payload: response
            })
            if (callback)
                callback();
        }
    },

    reducers: {
        queryTask(state, action) {
            if (!action.payload)
                return { ...state }
            else return {
                ...state,
                data: action.payload
            }
        },
        appendTask(state, action) {
            if (!action.payload)
                return { ...state }
            else return {
                ...state,
                data: state.task.concat(action.payload)
            }
        }
    },
}
