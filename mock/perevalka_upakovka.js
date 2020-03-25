import { parse } from 'url';

let tableListDataSource = [];
for (let i = 0; i < 1; ++i) {
    tableListDataSource.push({
        id: i,
        year: 2014,
        month: 1,
        perevalka_rub: 400,
        perevalka_dollar: 11.839784042339069,
        upakovka_rub: 300,
        upakovka_dollar: 8.879838031754302
    })
}

function getPerevalkaUpakovka(req, res, u) {
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
    };
    
    return res.json(result);
}

function postPerevalkaUpakovka(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { method, id, year, month, perevalka_rub, perevalka_dollar, upakovka_rub, upakovka_dollar } = body;

    switch (method) {
    case 'remove':
        tableListDataSource = tableListDataSource.filter(item => id === item.id);
        break;
    case 'add':
        const i = tableListDataSource.length + 1;
        tableListDataSource.push({
            id: i,
            year,
            month,
            perevalka_rub,
            perevalka_dollar,
            upakovka_rub,
            upakovka_dollar
        })
        break;
    case 'update':
        tableListDataSource = tableListDataSource.map(item => {
            if (item.id === id) {
                Object.assign(item, { 
                    year,
                    month,
                    perevalka_rub,
                    perevalka_dollar,
                    upakovka_rub,
                    upakovka_dollar
                })
                return item;
            }
            return item;
        })
        break;
    default:
        break;
    }

    return getPerevalkaUpakovka(req, res, u)
}

export default {
    'GET /api/perevalka_upakovka': getPerevalkaUpakovka,
    'POST /api/perevalka_upakovka': postPerevalkaUpakovka,
};