import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'login',

    state :{
        status: undefined
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(accountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });

            if (response.status === 'ok') {
                reloadAuthorized();
                yield put(routerRedux.replace('/'));
            }
        },

        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                    currentAuthority: 'guest',
                },
            });
            reloadAuthorized();
            const { redirect } = getPageQuery();
            if (window.location.pathname !== '/auth/login' && !redirect) {
                yield put(
                    routerRedux.replace({
                            pathname: '/auth/login',
                            search: stringify({
                            redirect: window.location.href,
                        }),
                    })
                );
            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
            };
        },
    },
};
