"use strict";

const dateFormat = require("date-format");

const axios = require("axios");
// 通过环境变量设置 Camunda BPM 的 host:port
const bpmHost = process.env.CAMUNDA_BPM_HOST || "localhost";
const bpmPort = process.env.CAMUNDA_BPM_PORT || "9001";
const bpmClient = axios.create({
  baseURL: `http://${bpmHost}:${bpmPort}/engine-rest/`,
  headers: { "Content-Type": "application/json" }
});

/**
 * 将 JSON 格式数据转换成 Value_Type 格式数据
 *
 * @param {Object} json - JSON 格式数据
 * @returns {Object} - Value_Type 格式数据
 */
const jsonToTypeValue = json => {
  let res = {};

  for (const key in json) {
    switch (Object.prototype.toString.call(json[key])) {
      case "[object Object]":
        // 是 JSON
        res[key] = {
          type: "Json",
          value: JSON.stringify(json[key])
        };
        break;
      case "[object Date]":
        // 是 Date
        res[key] = {
          type: "Date",
          value: dateFormat(dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT, json[key])
        };
        break;
      default:
        // 其它类型，Camunda 会自动推断类型，指定
        res[key] = { value: json[key] };
        break;
    }
  }

  return res;
};

const createApplication = applicationDetails => {
  return new Promise((resolve, reject) => {
    const opt = {
      url: "/process-definition/key/approval-process/start",
      method: "post",
      data: {
        variables: jsonToTypeValue(applicationDetails)
      }
    };
    bpmClient
      .request(opt)
      .then(res => {
        resolve(res.data.id);
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

module.exports = {
  createApplication
};
