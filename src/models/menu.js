import memoizeOne from 'memoize-one'
import isEqual from 'lodash/isEqual'

function formatter(data, parentName) {
    if (!data)
        return undefined;
    return data
        .map(item => {
            if (!item.name || !item.path)
                return null;

            let locale = 'menu';
            if (parentName && parentName !== '/')
                locale = `${parentName}.${item.name}`;
            else
                locale = `menu.${item.name}`;

            const name = item.name
            const result = {
                ...item,
                name,
                locale,
            };
            if (item.routes) {
                const children = formatter(item.routes, locale);
                result.children = children;
            }
            delete result.routes;
            return result;
        }).filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const getSubMenu = item => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children),
        }
    }
    return item;
}

const filterMenuData = menuData => {
    if (!menuData)
        return [];
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => getSubMenu(item))
        .filter(item => item)
}

const getBreadcrumbNameMap = menuData => {
    if (!menuData)
        return {};
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children)
                flattenMenuData(menuItem.children);
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

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
            const originalMenuData = memoizeOneFormatter(routes, path);
            const menuData = filterMenuData(originalMenuData);
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
            yield put({
                type: 'save',
                payload: { menuData, breadcrumbNameMap, routerData: routes }
            })
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
    },
};