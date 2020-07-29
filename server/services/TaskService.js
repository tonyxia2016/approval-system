/* eslint-disable no-unused-vars */
const Service = require("./Service");
const camunda = require("../camunda-utils/CamundaUtils");

/**
 * 查询用户任务
 * 通过用户名和用户角色来查询相关的用户任务
 *
 * taskListQueryDto TaskListQueryDto
 * no response value expected for this operation
 * */
const getTaskList = ({ taskListQueryDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      const taskList = await camunda.getTaskList(
        taskListQueryDto.username,
        taskListQueryDto.roles
      );
      resolve(
        Service.successResponse({
          code: 20000,
          data: taskList
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

const getApplicationDetail = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const applicationDetail = await camunda.getApplicationDetail(id);
      resolve(
        Service.successResponse({
          code: 20000,
          data: applicationDetail
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

module.exports = {
  getTaskList,
  getApplicationDetail
};
