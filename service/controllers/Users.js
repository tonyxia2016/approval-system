'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.getInfo = function getInfo (req, res, next, token) {
  Users.getInfo(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.login = function login (req, res, next, body) {
  Users.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logout = function logout (req, res, next, xToken) {
  Users.logout(xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
