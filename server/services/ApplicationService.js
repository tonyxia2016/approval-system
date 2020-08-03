/* eslint-disable no-unused-vars */
const Service = require("./Service");
const camunda = require("./camunda-utils");

const moment = require("moment");

/**
 * 创建一个申请
 * 申请人在“申请页面”填写相关信息并提交申请，将调用此 API 来创建一个新申请。
 *
 * applicationDetailDto ApplicationDetailDto
 * returns inline_response_200
 * */
const createApplication = ({ applicationDetailDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      for (const key in applicationDetailDto) {
        // 将所有具有'Date'后缀的，且不为空的字段转换成 Date 类型
        if (/Date$/.test(key) && applicationDetailDto[key]) {
          applicationDetailDto[key] = moment(
            applicationDetailDto[key]
          ).toDate();
        }
        // 将所有具有'Cost'、'Amount'或'Price'后缀，且不为空的字段转换成 Number 类型
        if (/(Cost|Amount|Price)$/.test(key) && applicationDetailDto[key]) {
          applicationDetailDto[key] = Number(applicationDetailDto[key]);
        }
      }

      const id = await camunda.createApplication(applicationDetailDto);

      resolve(
        Service.successResponse({
          code: 20000,
          data: { id }
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

const getHistory = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const history = await camunda.getHistory(id);

      resolve(
        Service.successResponse({
          code: 20000,
          data: history
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

const getHistoryList = ({ historyListQueryDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      const historyList = await camunda.getHistoryList(historyListQueryDto);

      resolve(
        Service.successResponse({
          code: 20000,
          data: historyList
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

const updateApplication = ({ applicationDetailDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      await camunda.updateApplication(applicationDetailDto);

      resolve(
        Service.successResponse({
          code: 20000,
          data: "Success"
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

module.exports = {
  createApplication,
  getHistory,
  getHistoryList,
  updateApplication
};
