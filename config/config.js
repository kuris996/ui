import os from 'os';
import pageRoutes from './router.config'
import slash from 'slash2'
import darkTheme from '@ant-design/dark-theme'

const plugins = [
    [
        'umi-plugin-react',
        {
            antd: true,
            dva: {
                hmr: true,
            },
            locale: {
                enable: true,
                default: 'ru-RU',
                baseNavigator: true
            },
            dynamicImport: { webpackChunkName: true },
        }
    ]
]

export default {
    plugins,
    treeShaking: true,
    routes: pageRoutes,
    theme: {
        ...darkTheme,
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    disableRedirectHoist: true,
    cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
        if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('ui.less') ||
            context.resourcePath.includes('global.less')
        ) {
            return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
            const antdProPath = match[1].replace('.less', '');
            const arr = slash(antdProPath)
                .split('/')
                .map(a => a.replace(/([A-Z])/g, '-$1'))
                .map(a => a.toLowerCase());
            return `ui${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
    },
    },
    manifest: {
        basePath: '/',
    },
  }