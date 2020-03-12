export default [
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/calculation/task-list', },
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
                        path: '/calculation/task-form',
                        name: 'Задача',
                        component: './Calculation/TaskForm',
                    }
                ],                
            },
        ]
    }
]