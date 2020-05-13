import { queryChartData } from '@/services/api'

export default {
    namespace: 'chart',

    state: {
        chartData: [],
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryChartData);
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
                ...action.payload
            }
        }
    },
}