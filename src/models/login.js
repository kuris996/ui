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
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (window.routerBase !== '/')
                            redirect = redirect.replace(window.routerBase, '/');
                        if (redirect.match(/^\/.*#/))
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                    } else {
                        redirect = null;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        }
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
