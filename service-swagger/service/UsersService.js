"use strict";

/**
 * 获取用户信息
 * 通过 token 获取用户信息，必须先登录成功。
 *
 * token String 用户 token
 * returns inline_response_200_1
 **/

// TODO: 完成 getInfo API，并注释下面的 Mock 代码
const { mockGetInfo } = require("../mock/MockUsersService");

exports.getInfo = function (token) {
  return new Promise(function (resolve, reject) {
    resolve(mockGetInfo(token));
  });
};

/**
 * 用户登录
 *
 * body Body
 * returns inline_response_200
 **/

// TODO：完成 login API，并注释下面的 Mock 代码
const { mockLogin } = require("../mock/MockUsersService");

exports.login = function (body) {
  return new Promise(function (resolve, reject) {
    const { username, password } = body; // 获取请求参数

    resolve(mockLogin(username, password));
  });
};

/**
 * 用户登出
 *
 * xToken String 通过 `header` 中的 `X-Token` 来传递 token
 * returns inline_response_200_2
 **/

// TODO: 完成 logout API
 
exports.logout = function (xToken) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      code: 20000,
      data: "success"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
