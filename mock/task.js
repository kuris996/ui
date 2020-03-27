
let sourceData;

function taskList(count) {
    const list = [];
    for (let i = 0; i < count; ++i) {
        list.push({
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
    return list;
}

function getTaskList(req, res) {
    const params = req.query;

    const count = params.count * 1 || 20

    const result = taskList(2);
    sourceData = result;
    return res.json(result);
}

export default {
    'GET /api/task': getTaskList,
}