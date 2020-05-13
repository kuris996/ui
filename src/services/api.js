import { stringify } from 'qs'
import request from '@/utils/request'

/*
    task
*/

export async function queryTask(params) {
    return request(`/api/task?${stringify(params)}`)
}

export async function removeTask(params) {
    return request('/api/task', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove'
        }
    })
}

export async function addTask(params) {
    return request('/api/task', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        },
    });
}

/*
    kit
*/

export async function queryKit(params) {
    return request(`/api/kit?${stringify(params)}`)
}

export async function removeKit(params) {
    return request('/api/kit', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove'
        }
    })
}

export async function addKit(params) {
    return request('/api/kit', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        },
    })
}

/*
    backtesting
*/

export async function queryBacktesting(params) {
    return request(`/api/backtesting?${stringify(params)}`)
}

export async function removeBacktesting(params) {
    return request('/api/backtesting', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove'
        }
    })
}

export async function addBacktesting(params) {
    return request('/api/backtesting', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        },
    })
}

/*
    chart
*/

export async function queryChartData() {
    return request(`/api/chart_data`);
}

/*
    input
*/

export async function queryInput(params) {
    return request(`/api/input?${stringify(params)}`);
}

/*
    params
*/

export async function queryParams(params) {
    return request(`/api/params?${stringify(params)}`);
}

/*
    login
*/

export async function accountLogin(params) {
    return request(`/api/login/account`, {
        method: 'POST',
        data: params,
    });
}
