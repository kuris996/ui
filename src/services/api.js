import { stringify } from 'qs'
import request from '@/utils/request'

export async function queryFakeTaskList(params) {
    return request(`/api/fake_task_list?${stringify(params)}`)
}

export async function fakeAccountLogin(params) {
    return request(`/api/login/account`, {
        method: 'POST',
        data: params,
    });
}
