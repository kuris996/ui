import { stringify } from 'qs'
import request from '@/utils/request'

export async function queryFakeTaskList(params) {
    return request(`/calculation/api/fake_task_list?${stringify(params)}`)
}