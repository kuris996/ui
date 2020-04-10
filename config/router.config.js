export default [
    {
        path: '/auth',
        component: '../layouts/UserLayout',
        routes: [
          { path: '/auth', redirect: '/auth/login' },
          { path: '/auth/login', name: 'login', component: './Auth/Login' },
          {
            component: '404',
          },
        ],
      },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
            { path: '/', redirect: '/calculation/task-list', authority: ['user'] },
            // calculation
            {
                path: '/calculation',
                name: 'Расчет',
                icon: 'calculator',
                routes: [
                    {
                        path: '/calculation/task-list',
                        name: 'Задачи',
                        component: './Calculation/TaskList',
                    },
                    {
                        hideInMenu: true,
                        path: '/calculation/task-inputs',
                        name: 'Подробнее',
                        component: './Bucket/InputsList'
                    },
                    {
                        hideInMenu: true,
                        path: '/calculation/task-form',
                        name: 'Задача',
                        component: './Calculation/TaskForm',
                    },
                    {
                        path: '/calculation/kit-list',
                        name: 'Наборы',
                        component: './Calculation/KitList',
                    },
                    {
                        hideInMenu: true,
                        path: '/calculation/kit-inputs',
                        name: 'Подробнее',
                        component: './Bucket/InputsList'
                    },
                    {
                        hideInMenu: true,
                        path: '/calculation/kit-form',
                        name: 'Набор',
                        component: './Calculation/KitForm',
                    },
                ],
            },
            // exception
            {
                name: 'Ошибка',
                icon: 'warning',
                path: '/exception',
                hideInMenu: true,
                routes: [
                  // exception
                    {
                        path: '/exception/403',
                        name: 'not-permission',
                        component: './Exception/403',
                    },
                    {
                        path: '/exception/404',
                        name: 'not-find',
                        component: './Exception/404',
                    },
                    {
                        path: '/exception/500',
                        name: 'server-error',
                        component: './Exception/500',
                    },
                ],
            },
        ]
    },
]