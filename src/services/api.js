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
    login
*/

export async function accountLogin(params) {
    return request(`/api/login/account`, {
        method: 'POST',
        data: params,
    });
}
