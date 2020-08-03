"use strict";

const moment = require("moment");

const axios = require("axios");
const ApplicationController = require("../../controllers/ApplicationController");
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
      // case "[object Object]":
      //   // 是 JSON
      //   res[key] = {
      //     type: "Json",
      //     value: JSON.stringify(json[key])
      //   };
      //   break;
      case "[object Date]":
        // 是 Date
        res[key] = {
          type: "Date",
          value: moment(json[key])
            .format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
            .toString()
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

/**
 * 将 Value_Type 格式数据转换成 JSON 格式数据
 *
 * @param {Object} typeValue - Value_Type 格式数据
 * @returns {Object} - JSON 格式数据
 */
const typeValueToJson = typeValue => {
  let res = {};

  for (const key in typeValue) {
    switch (typeValue[key].type) {
      case "Date":
        res[key] = moment(typeValue[key].value).toDate();
        break;
      default:
        // 其它类型，直接转换为 Javascript 类型
        res[key] = typeValue[key].value;
        break;
    }
  }

  return res;
};

/**
 * 创建一个新的申请流程
 *
 * @param {*} applicationDetail - 申请的详情
 * @returns {Promise.<string>} - 创建申请成功，则返回该申请流程的 ID
 */
const createApplication = applicationDetail => {
  return new Promise((resolve, reject) => {
    const opt = {
      url: "/process-definition/key/approval-process/start",
      method: "post",
      data: {
        variables: jsonToTypeValue(applicationDetail)
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

/**
 * 获取申请的详情
 *
 * @description 通过任务 ID 获取申请的详情（流程变量）
 * @param {string} id
 */
const getApplicationDetail = id => {
  return new Promise((resolve, reject) => {
    const opt = {
      url: `/task/${id}/variables`,
      method: "get"
    };

    bpmClient
      .request(opt)
      .then(res => {
        const variables = typeValueToJson(res.data);
        resolve({ ...variables, id });
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

/**
 * 获取用户相关的任务数
 *
 * @description 与 getTaskList 类似，只是返回总数而不是详情
 * @description 暂时没有用到
 * @param {string} username - 用户名
 * @param {Array.<string>} roles - 用户的角色列表
 * @returns {Object} - 符合条件的任务数
 */
const getTaskListCount = ({ username, roles }) => {};

/**
 * 获取用户相关的任务详情列表
 *
 * @description 用户相关任务是指：已经指定给 username 的任务，或者候选组包含任意一个 roles 的任务。
 * @param {string} username - 用户名
 * @param {string[]} roles - 用户的角色列表
 * @returns {Array.<Object>} - 返回和用户相关的任务详情列表，按照申请时间倒序排列。
 */
const getTaskList = ({ username, roles }) => {
  return new Promise((resolve, reject) => {
    const opt = {
      url: "/task",
      method: "post",
      data: {
        orQueries: [
          {
            includeAssignedTasks: true,
            candidateGroups: roles,
            assignee: username
          }
        ],
        sorting: [
          {
            sortBy: "processVariable",
            sortOrder: "desc",
            parameters: {
              variable: "startDate",
              type: "Date"
            }
          }
        ]
      }
    };

    // 获取 Task ID 列表，按提交的时间倒序排序
    bpmClient
      .request(opt)
      .then(res => {
        if (res.data) {
          // 如果查询结果不为空，则生成 taskList 数组
          let taskList = res.data.map(item => {
            return { id: item.id };
          });

          // 按照 taskList 获取申请详情，并返回。
          let queryTasks = taskList.map(item => {
            return getApplicationDetail(item.id);
          });

          Promise.all(queryTasks)
            .then(res => {
              // 异步查询不能保证返回的申请详情按照申请时间排序，需按照原排序进行排序
              resolve(
                taskList.map(item =>
                  res.find(element => element.id === item.id)
                )
              );
            })
            .catch(err => {
              reject(err.message);
            });
        } else {
          resolve([]);
        }
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

/**
 * 通过 Task ID 来完成一个申请
 *
 * @returns {Promise}
 */
const completeApproval = ({
  id,
  approver,
  approverName,
  approvalDate,
  approvalConclusion,
  approvalComment,
  nextApprover
}) => {
  return new Promise(async (resolve, reject) => {
    // 获取申请详情，包括历史审批信息
    const applicationDetail = await getApplicationDetail(id);
    // 添加本次的审批信息到历史审批信息
    const approvalHistory = applicationDetail.approvalHistory || [];
    approvalHistory.push({
      approver,
      approverName,
      approvalDate,
      approvalConclusion,
      approvalComment
    });

    let opt;
    switch (approvalConclusion) {
      case "同意":
      case "驳回":
        opt = {
          url: `/task/${id}/complete`,
          method: "post",
          data: {
            variables: {
              approvalHistory: {
                value: approvalHistory
              },
              approved: {
                value: approvalConclusion === "同意"
              },
              approver: {
                value: {
                  user: approver,
                  group: ""
                }
              }
            }
          }
        };

        await bpmClient.request(opt);
        resolve({ code: 20000, data: "Success" });
        break;
      case "上报":
      case "移交":
        // 通过 Task ID 获取 Process ID
        opt = {
          url: `/task/${id}`,
          method: "get"
        };
        const taskInfo = (await bpmClient.request(opt)).data;
        const processInstanceId = taskInfo.processInstanceId;
        // 发送 "reassign-approver" 消息来重新指定审批人
        opt = {
          url: `/message`,
          method: "post",
          data: {
            messageName: "reassign-approver",
            processInstanceId: processInstanceId,
            processVariables: {
              approvalHistory: {
                value: approvalHistory
              },
              approver: {
                value: nextApprover
              }
            }
          }
        };

        await bpmClient.request(opt);
        resolve({ code: 20000, data: "Success" });
        break;
      default:
        reject({
          code: 70000,
          message: "审批结论不正确，必须为['同意','驳回','上报','移交']之一."
        });
        break;
    }
  });
};

/**
 * 指定审批任务的审批人，并清空候选组
 *
 * @param {string} id - 审批任务ID
 * @param {string} username - 审批人的用户ID
 * @returns {Promise.<Object>}
 */
const claimApproval = ({ id, username }) => {
  return new Promise(async (resolve, reject) => {
    // 获取 Identity Link
    let opt = {
      url: `/task/${id}/identity-links`,
      method: "get"
    };
    const allLinks = (await bpmClient.request(opt)).data;

    // 删除所有的 Identity Link
    for (const link of allLinks) {
      opt = {
        url: `/task/${id}/identity-links/delete`,
        method: "post",
        data: link
      };
      await bpmClient.request(opt);
    }

    // 指定 username 为审批人
    opt = {
      url: `/task/${id}/identity-links`,
      method: "post",
      data: {
        userId: username,
        type: "assignee"
      }
    };
    await bpmClient.request(opt);

    resolve({ code: 20000, data: "Success" });
  });
};

const getHistory = id => {
  return new Promise(async (resolve, reject) => {
    const opt = {
      url: `/history/variable-instance`,
      method: "post",
      data: {
        processInstanceId: `${id}`
      }
    };

    try {
      const queryRes = await bpmClient.request(opt);
      // 将结果转换成 JSON
      let applicationDetail = {};
      for (const item of queryRes.data) {
        applicationDetail[item.name] = item.value;
      }
      applicationDetail.id = id;

      resolve(applicationDetail);
    } catch (err) {
      reject(err.message);
    }
  });
};
/**
 * 查询已完成的申请列表
 *
 * @param {string} username - 申请人用户ID
 * @param {Array.<string>} roles - 用户角色
 * @param {Date} queryStartDate - 查询的起始日期（默认终止日期为今天）
 * @returns {Promise.<Array>} - 返回历史申请详情列表数组
 */

const getHistoryList = ({ username, roles, queryStartDate }) => {
  return new Promise(async (resolve, reject) => {
    const opt = {
      url: "/history/process-instance",
      method: "post",
      data: {
        processDefinitionKey: "approval-process",
        completed: true,
        finishedAfter: moment(queryStartDate)
          .format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
          .toString(),
        variables: [
          {
            name: "applicant",
            value: username,
            operator: "eq"
          }
        ]
      },
      sorting: [
        {
          sortBy: "endTime",
          sortOrder: "desc"
        }
      ]
    };

    const res = await bpmClient.request(opt);
    // 如果查询列表不为空，则获取所有的申请详情
    if (res.data) {
      const opts = res.data.map(item => {
        return {
          url: `/history/variable-instance`,
          method: "post",
          data: {
            processInstanceId: `${item.id}`
          }
        };
      });
      // 生成列表查询请求
      const queries = opts.map(item => {
        return new Promise(async (resolve, reject) => {
          try {
            const queryRes = await bpmClient.request(item);
            // 将结果转换成 JSON
            let applicationDetail = {};
            for (const item of queryRes.data) {
              applicationDetail[item.name] = item.value;
            }
            applicationDetail.id = item.data.processInstanceId;

            resolve(applicationDetail);
          } catch (err) {
            reject(err.message);
          }
        });
      });

      // 开启批量查询
      try {
        const queriesRes = await Promise.all(queries);
        // 异步查询不能保证返回的申请详情按照申请时间排序，需按照原排序进行排序
        resolve(
          res.data.map(item =>
            queriesRes.find(element => element.id === item.id)
          )
        );
      } catch (err) {
        resolve([]);
      }
    } else {
      resolve([]);
    }
  });
};

const updateApplication = applicationDetail => {
  return new Promise((resolve, reject) => {
    const opt = {
      url: `/task/${applicationDetail.id}/complete`,
      method: "post",
      data: {
        variables: jsonToTypeValue(applicationDetail)
      }
    };
    bpmClient
      .request(opt)
      .then(() => {
        resolve("Success");
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

module.exports = {
  createApplication,
  claimApproval,
  completeApproval,
  getTaskList,
  getApplicationDetail,
  getHistory,
  getHistoryList,
  updateApplication
};
