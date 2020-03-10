export default [
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/task-list' },
            {
                path: '/task-list',
                name: 'task',
                component: './TaskList'
            },
        ]
    }
]