'use strict';


/**
 * 审核
 * 审核人通过审核界面，给出审核决定。
 *
 * body Approval-details 
 * no response value expected for this operation
 **/
exports.approval = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 获取任务详情
 * 根据 task id 获取任务详情
 *
 * id String 任务 id
 * returns inline_response_200_2
 **/
exports.getPendingTask = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 获取任务列表
 * 获取和本人相关的待处理任务列表。即：指定给本人的任务，或本人所在组在任务的候选用户组列表中。 - 支持分页。 - 在获取列表前，可以通过 `POST /task/count` API 来获取结果的总数。 - 支持查询其它条件。可查询条件包括：    - 申请类型    - 案件号      - 车牌号 
 *
 * body Task-query 
 * firstResult Integer 第一条结果的索引，用于分页。 (optional)
 * maxResults Integer 返回结果的最大条数，用于分页。 (optional)
 * returns List
 **/
exports.getPendingTaskList = function(body,firstResult,maxResults) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "507f4e4a-baa5-11ea-b3de-0242ac130004", "759a30e6-baa5-11ea-b3de-0242ac130004", "7a54eb30-baa5-11ea-b3de-0242ac130004" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 获取任务列表的总项数
 * 获取和本人相关的待处理任务列表总项数。 - 支持查询其它条件。可查询条件包括：    - 申请类型    - 案件号      - 车牌号 
 *
 * body Task-query 
 * returns inline_response_200_1
 **/
exports.getPendingTaskListCount = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "count" : 3
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 创建流程实例
 * 申请人在“申请页面”填写相关信息并提交申请，将调用此 API 来创建一个审批流程实例。
 *
 * body Application-details 
 * returns inline_response_200
 **/
exports.start = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "bc8d2f78-ba94-11ea-b3de-0242ac130004"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 更新申请内容
 * 更新申请内容。
 *
 * body Application-details 
 * id String 任务 id
 * no response value expected for this operation
 **/
exports.updatePendingTask = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

