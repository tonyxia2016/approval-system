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

export function completeApproval(data) {
  return request({
    url: '/task/complete',
    method: 'post',
    data
  })
}

export function claimApproval(data) {
  return request({
    url: '/task/claim',
    method: 'post',
    data
  })
}
