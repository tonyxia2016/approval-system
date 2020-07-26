import request from '@/utils/request'

export function createApplication(data) {
  return request({
    url: '/application/create',
    method: 'post',
    data
  })
}
