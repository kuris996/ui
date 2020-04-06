export default [
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/calculation/task-list', },
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
                        path: '/calculation/kit-form',
                        name: 'Набор',
                        component: './Calculation/KitForm',
                    },
                ],
            },
            {
                name: 'Корзина',
                path: '/bucket',
                hideInMenu: true,
                routes: [
                    {
                        path: '/bucket/input-list',
                        name: 'Вводные',
                        component: './Bucket/Inputs',
                    },
                    {
                        path: '/bucket/output-list',
                        name: 'Расчет',
                        component: './Bucket/Outputs',
                    },
                    {
                        path: '/bucket/models-list',
                        name: 'Модели',
                        component: './Bucket/Models',
                    },
                ]
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