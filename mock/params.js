const products = [
    {
        "product" : 'test1',
        "years": [
            "2010",
            "2011",
            "2013"
        ]
    },
    {
        "product" : 'test2',
        "years": [
            "2020",
            "2021",
            "2023"
        ]
    }
]


function getParams(req, res) {
    res.json(products)
}

export default {
    'GET /api/params': getParams,
}