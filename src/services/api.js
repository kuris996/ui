import { stringify } from 'qs'
import request from '@/utils/request'

export async function queryFakeTaskList(params) {
    return request(`api/fake_task_list?${stringify(params)}`)
}