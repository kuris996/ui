
import { parse } from 'url';

let tableListDataSource = []
for (let i = 0; i < 1; ++i) {
    tableListDataSource.push({
        id: `fake-task-list-${i}`,
        product: "НИТРОАММОФОСКА",
        status: ['idle', 'running', 'error', 'finished'][i % 4],
        percent: Math.ceil(Math.random() * 50) + 50,
        updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        startedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        finishedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
    })
}

let filters = {
    status: [
        {
            text: "idle",
            value: 'idle'
        },
        {
            text: "running",
            value: 'running'
        },
        {
            text: "finished",
            value: 'finished'
        },
        {
            text: "error",
            value: 'error'
        },
    ]
}

function getTask(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = tableListDataSource;

    if (params.sorter) {
        const s = params.sorter.split('-');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend')
                return next[s[0]] - prev[s[0]];
            else
                return prev[s[0]] - next[s[0]];
        })
    }

    if (params.status) {
        const status = params.status.split(',');
        let filterDataSource = [];
        status.forEach(s => {
            filterDataSource = filterDataSource.concat(
                dataSource.filter(data => parseInt(data.status, 10) == parseInt(s[0], 10))
            );
        });
        dataSource = filterDataSource;
    }

    if (params.name) {
        dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    let pageSize = 10;
    if (params.pageSize) {
        pageSize = params.pageSize * 1;
    }
    const result = {
        list: dataSource,
        pagination: {
          total: dataSource.length,
          pageSize,
          current: parseInt(params.currentPage, 10) || 1,
        },
        filters: filters
    };
    
    return res.json(result);
}

function postTask(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { method, id, product, status, percent, updatedAt, createdAt, startedAt, finishedAt } = body;

    console.log("BODY", status, createdAt)

    switch (method) {
    case 'remove':
        tableListDataSource = tableListDataSource.filter(item => id === item.id);
        break;
    case 'add':
        const i = tableListDataSource.length + 1;
        tableListDataSource.push({
            id: i,
            product,
            status,
            percent,
            updatedAt,
            createdAt,
            startedAt,
            finishedAt
        })
        break;
    case 'update':
        tableListDataSource = tableListDataSource.map(item => {
            if (item.id === id) {
                Object.assign(item, { 
                    product,
                    status,
                    percent,
                    updatedAt,
                    createdAt,
                    startedAt,
                    finishedAt
                })
                return item;
            }
            return item;
        })
        break;
    default:
        break;
    }

    return getTask(req, res, u)
}

export default {
    'GET /api/task': getTask,
    'POST /api/task': postTask,
}
