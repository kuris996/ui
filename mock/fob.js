import { parse } from 'url';

let tableListDataSource = [];
for (let i = 0; i < 46; ++i) {
    tableListDataSource.push({
        id: i,
        product: "НИТРОАММОФОСКА",
        year: 2014,
        month: i,
        seller: "АЗОТНАЯ",
        foreign_price: 329.5,
        foreign_costs: 41.085
    })
}

function getFob(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = tableListDataSource;

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
    };
    
    return res.json(result);
}

export default {
    'GET /api/fob': getFob,
}