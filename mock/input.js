
function list() {
    const list = [];
    for (let i = 0; i < 5; ++i) {
        list.push({
            key: `fake-list-key-${i}`,
            size: Math.pow(4 * 1024, i),
            lastModified: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
            url: ""
        })
    }
    return list
}

function getInput(req, res) {
    return res.json(list())
}

export default {
    'GET /api/input': getInput,
}