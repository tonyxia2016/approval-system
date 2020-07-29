/* eslint-disable no-unused-vars */
const Service = require("./Service");
const camunda = require("../camunda-utils/CamundaUtils");

const moment = require("moment");

/**
 * 创建一个申请
 * 申请人在“申请页面”填写相关信息并提交申请，将调用此 API 来创建一个新申请。
 *
 * applicationDetailsDto ApplicationDetailsDto
 * returns inline_response_200
 * */
const createApplication = ({ applicationDetailsDto }) =>
  new Promise(async (resolve, reject) => {
    try {
      for (const key in applicationDetailsDto) {
        // 将所有具有'Date'后缀的，且不为空的字段转换成 Date 类型
        if (/Date$/.test(key) && applicationDetailsDto[key]) {
          applicationDetailsDto[key] = moment(
            applicationDetailsDto[key]
          ).toDate();
        }
        // 将所有具有'Cost'、'Amount'或'Price'后缀，且不为空的字段转换成 Number 类型
        if (/(Cost|Amount|Price)$/.test(key) && applicationDetailsDto[key]) {
          applicationDetailsDto[key] = Number(applicationDetailsDto[key]);
        }
      }

      const id = await camunda.createApplication(applicationDetailsDto);

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

module.exports = {
  createApplication
};
