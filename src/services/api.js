import { stringify } from 'qs'
import request from '@/utils/request'

export async function queryFob(params) {
    return request(`/api/fob?${stringify(params)}`)
}

export async function queryTask(params) {
    return request(`/api/task?${stringify(params)}`)
}

export async function accountLogin(params) {
    return request(`/api/login/account`, {
        method: 'POST',
        data: params,
    });
}