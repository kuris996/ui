import memoizeOne from 'memoize-one'
import isEqual from 'lodash/isEqual'
import { formatMessage } from 'umi-plugin-react/locale'

export default {
    namespace: 'menu',

    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },

    effects: {
        *getMenuData({ payload }, { put }) {
            const { routes, path} = payload;

        }
    },

    reducers: {
    },
}