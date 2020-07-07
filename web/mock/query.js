/* eslint-disable space-before-function-paren */
/**
 * Mock Data 定义
 */
// const applications = [
//   {
//     id: 'eabed822-c013-11ea-b3de-0242ac130004',
//     type: '包干修复',
//     caseNo: '03164734',
//     plateNo: '鄂A-47F24',
//     applicant: 'xiawei',
//     startDate: '2020-06-03',
//     approver: 'zhangyang',
//     approvalDate: '2020-06-05',
//     state: '审批中'
//   },
//   {
//     id: 'ddf2da4e-c013-11ea-b3de-0242ac130004',
//     type: '调价申请',
//     caseNo: '10192658',
//     plateNo: '鄂A-W2470',
//     applicant: 'xiawei',
//     startDate: '2020-06-25',
//     approver: 'lijie',
//     approvalDate: '2020-07-04',
//     state: '同意'
//   },
//   {
//     id: 'd3dc376c-c013-11ea-b3de-0242ac130004',
//     type: '总成部件',
//     caseNo: '08112039',
//     plateNo: '鄂A-J2488',
//     applicant: 'xiawei',
//     startDate: '2020-07-01',
//     approver: 'yuyong',
//     approvalDate: '2020-07-09',
//     state: '驳回'
//   },
//   {
//     id: '17a3dc56-c01a-11ea-b3de-0242ac130004',
//     type: '调价申请',
//     caseNo: '08112039',
//     plateNo: '鄂A-J2488',
//     applicant: 'guoping',
//     startDate: '2020-07-01',
//     approver: 'yuyong',
//     approvalDate: '2020-07-09',
//     state: '驳回'
//   }
// ]

import Mock from 'mockjs'

const applications = Mock.mock({
  'items|30': [{
    'id': '@id',
    'type': ['包干修复', '高价值件', '总成部件', '调价申请'],
    'caseNo|8': '12345678',
    'palteNo': /(鄂A-)([0-9]|[A-Z]){5}/,
    'applicant|1': ['夏伟', '郭平'],
    'startDate': function () {
      return '2019' + Mock.Random.date('MM-dd')
    },
    'approver|1': ['张洋', '李捷', '冯明', '吴超', '于勇'],
    'approvalDate': '@now',
    'state|1': ['审批中', '同意', '驳回']
  }]
})

export default [
  {
    url: '/query/application',
    type: 'post',
    response: config => {

    }
  }
]
