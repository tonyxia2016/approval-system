'use strict';

var utils = require('../utils/writer.js');
var Process = require('../service/ProcessService');

module.exports.approval = function approval (req, res, next, body) {
  Process.approval(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPendingTask = function getPendingTask (req, res, next, id) {
  Process.getPendingTask(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPendingTaskList = function getPendingTaskList (req, res, next, body, firstResult, maxResults) {
  Process.getPendingTaskList(body, firstResult, maxResults)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPendingTaskListCount = function getPendingTaskListCount (req, res, next, body) {
  Process.getPendingTaskListCount(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.start = function start (req, res, next, body) {
  Process.start(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updatePendingTask = function updatePendingTask (req, res, next, body, id) {
  Process.updatePendingTask(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
