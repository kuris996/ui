import mockjs from 'mockjs'

const calculationTypes = [
    'Ценовые войны',
    'Коалиции',
    'Оптимизация с учётом складов и коалиций',
    'Оптимизация с учётом складов',
    'Оптимизация'
]

let sourceData;

function fakeTaskList(count) {
    const list = [];
    for (let i = 0; i < count; ++i) {
        list.push({
            id: `fake-task-list-${i}`,
            calculationType: calculationTypes[i % 5],
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

function getFakeTaskList(req, res) {
    const params = req.query;

    const count = params.count * 1 || 20

    const result = fakeTaskList(count);
    sourceData = result;
    return res.json(result);
}

export default {
    'GET /api/fake_task_list': getFakeTaskList,
}