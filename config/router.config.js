export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', name: 'Авторизоваться', component: './Auth/Login' },
            { path: '/user/register', name: 'Регистрация', component: './Auth/Register' },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/calculation/task-list', },
            // calculation
            {
                path: '/calculation',
                name: 'Расчеты',
                icon: 'calculator',
                routes: [
                    {
                        path: '/calculation/task-list',
                        name: 'Список',
                        component: './Calculation/TaskList',
                    },
                    {
                        hideInMenu: true,
                        path: '/calculation/task-form',
                        name: 'Задача',
                        component: './Calculation/TaskForm',
                    }
                ],
            },
            // database
            {
                path: '/database',
                icon: 'database',
                name: 'База Данных',
                routes: [
                    {
                        path: '/database/fob-table',
                        name: 'FOB',
                        component: './Database/FOBTable',
                    },
                    {
                        path: '/database/logistics-table',
                        name: 'Logistics',
                        //component: './Database/FOBTable',
                    },
                    {
                        path: '/database/consignee-table',
                        name: 'Consignee',
                        //component: './Database/FOBTable',
                    },
                    {
                        path: '/database/factory-table',
                        name: 'Factory',
                        //component: './Database/FOBTable',
                    },
                    {
                        path: '/database/holding-table',
                        name: 'Holding',
                        //component: './Database/FOBTable',
                    }
                ]
            }
        ]
    },
    
]