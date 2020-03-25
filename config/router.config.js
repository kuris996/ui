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
                name: 'Справочник',
                routes: [
                    {
                        path: '/database/fob-table',
                        name: 'FOB',
                        component: './Database/FOBTable',
                    },
                    {
                        path: '/database/logistics-table',
                        name: 'logistics',
                        component: './Database/LogisticsTable',
                    },
                    {
                        path: '/database/consignee-table',
                        name: 'consignee',
                        component: './Database/ConsigneeTable',
                    },
                    {
                        path: '/database/region-table',
                        name: 'region',
                        component: './Database/RegionTable',
                    },
                    {
                        path: '/database/perevalka_upakovka-table',
                        name: 'perevalka_upakovka',
                        component: './Database/PerevalkaUpakovkaTable',
                    },

                    {
                        path: '/database/factory-table',
                        name: 'factory',
                        component: './Database/FactoryTable',
                    },
                    {
                        path: '/database/holding-table',
                        name: 'holding',
                        component: './Database/HoldingTable',
                    },
                ]
            }
        ]
    },
    
]