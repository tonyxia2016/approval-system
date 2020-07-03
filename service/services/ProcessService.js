/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* 获取未完成的任务列表
* 获取和本人相关的待处理任务列表。即：指定给本人的任务，或本人所在组在任务的候选用户组列表中。   - 支持分页。   - 在获取列表前，可以通过 `POST /task/count` API 来获取结果的总数。   - 支持查询其它条件。可查询条件包括：     - 申请类型     - 案件号     - 车牌号 
*
* taskQueryDto TaskQueryDto 
* firstResult Integer 第一条结果的索引，用于分页。 (optional)
* maxResults Integer 返回结果的最大条数，用于分页。 (optional)
* returns List
* */
const getPendingTaskList = ({ taskQueryDto, firstResult, maxResults }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        taskQueryDto,
        firstResult,
        maxResults,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* 创建流程实例
* 申请人在“申请页面”填写相关信息并提交申请，将调用此 API 来创建一个审批流程实例。
*
* applicationDetailsDto ApplicationDetailsDto 
* returns inline_response_200
* */
const startApplication = ({ applicationDetailsDto }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        applicationDetailsDto,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getPendingTaskList,
  startApplication,
};
