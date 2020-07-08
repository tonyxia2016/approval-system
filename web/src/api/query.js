/** queryApplication
 * @description 查询申请列表
 */

import request from '@/utils/request'

/**
 * @typedef QueryCondition
 * @type {Object}
 * @property {String} userid - 查询人的用户名
 * @property {String[]} roles - 查询人的角色
 */

/**
 * @typedef QueryResult
 * @type {Object}
 * @property {String} id - 系统分配的申请 id，唯一确定一个申请流程实例
 * @property {String} type - 申请类型：enum[ "包干修复", "高价值件", "总成部件", "调价申请" ]
 * @property {String} caseNo - 报案号
 * @property {String} plateNo - 车牌号
 * @property {String} applicantName - 申请人的用户姓名（实名，非登录名）
 * @property {String} startDate - 申请提交的时间
 * @property {String} approverName - 审批人的用户姓名（实名，非登录名）
 * @property {String} approvalDate - 审批的时间，如果正在审批中，值为：""
 * @property {String} state - 审批流程状态：enum[ "审批中", "同意", "驳回" ]
 */

/**
 * 查询申请列表
 * @param {QueryCondition} data - 查询条件
 * @returns {QueryResult[]} 符合搜索条件的申请列表
 */
export function queryApplication(data) {
  return request({
    url: '/query/application',
    method: 'post',
    data
  })
}
