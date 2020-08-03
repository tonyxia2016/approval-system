import request from '@/utils/request'

export function createApplication(data) {
  return request({
    url: '/application/create',
    method: 'post',
    data
  })
}

export function updateApplication(data) {
  return request({
    url: '/application/update',
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

export function getHistory(id) {
  return request({
    url: '/application/history',
    method: 'get',
    params: { id }
  })
}

export function getHistoryList(data) {
  return request({
    url: '/application/history',
    method: 'post',
    data
  })
}
