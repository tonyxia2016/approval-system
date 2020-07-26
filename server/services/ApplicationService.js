/* eslint-disable no-unused-vars */
const Service = require("./Service");
const bpmClient = require("../camunda-utils/CamundaUtils");

const dateFormat = require("date-format");

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
      // 将 startDate 转换为 Date Object
      applicationDetailsDto.startDate = dateFormat.parse(
        dateFormat.ISO8601_FORMAT,
        applicationDetailsDto.startDate
      );

      const id = await bpmClient.createApplication(applicationDetailsDto);

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
