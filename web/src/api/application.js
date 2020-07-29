import request from '@/utils/request'

export function createApplication(data) {
  return request({
    url: '/application/create',
    method: 'post',
    data
  })
}

export function getTaskList(data) {
  return request({
    url: '/task',
    method: 'post',
    data
  })
}

export function getApplicationDetail(id) {
  return request({
    url: '/task',
    method: 'get',
    params: { id }
  })
}
