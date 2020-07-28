/* eslint-disable no-unused-vars */
const Service = require("./Service");

/**
 * 查询用户任务
 * 通过用户名和用户角色来查询相关的用户任务
 *
 * taskQueryDto TaskQueryDto
 * no response value expected for this operation
 * */
const getTaskList = ({ taskQueryDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          taskQueryDto
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

module.exports = {
  getTaskList
};

// TODO: 修改 API 定义：getTask -> getTaskList
