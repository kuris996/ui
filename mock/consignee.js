import { parse } from 'url';

let tableListDataSource = [];
for (let i = 0; i < 1; ++i) {
    tableListDataSource.push({
        id: i,
        consignee: "ООО \"Агрохимия\"",
        station: "АЗОВ",
        region: "Ростовская область",
        holding: "Независимый посредник",
        GPS_latitude: 47.098506,
        GPS_longitude: 39.41732,
        year: 2014
    })
}

function getConsignee(req, res, u) {
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

function postConsignee(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { method, id, consignee, station, region, holding, GPS_latitude, GPS_longitude, year } = body;

    switch (method) {
    case 'remove':
        tableListDataSource = tableListDataSource.filter(item => id === item.id);
        break;
    case 'add':
        const i = tableListDataSource.length + 1;
        tableListDataSource.push({
            id: i,
            consignee,
            station,
            region,
            holding,
            GPS_latitude,
            GPS_longitude,
            year
        })
        break;
    case 'update':
        tableListDataSource = tableListDataSource.map(item => {
            if (item.id === id) {
                Object.assign(item, { 
                    consignee,
                    station,
                    region,
                    holding,
                    GPS_latitude,
                    GPS_longitude,
                    year
                })
                return item;
            }
            return item;
        })
        break;
    default:
        break;
    }

    return getConsignee(req, res, u)
}

export default {
    'GET /api/consignee': getConsignee,
    'POST /api/consignee': postConsignee,
};