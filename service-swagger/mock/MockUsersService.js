/**
 * 使用 Mock 数据，模拟用户登录。
 */
const tokens = {
  dingsun: { token: "dingsun-token" },
  reviewer1: { token: "reviewer1-token" },
  reviewer2: { token: "reviewer2-token" },
  reviewer3: { token: "reviewer3-token" },
  reviewer4: { token: "reviewer4-token" },
  leader: { token: "leader-token" },
  director: { token: "director-token" }
};

exports.mockLogin = (username, password) => {
  const token = tokens[username];

  if (token && password === "123") {
    // 登录成功
    return {
      code: 20000,
      data: token
    };
  } else {
    // 用户名不存在，或者密码不是 '123'
    return {
      code: 60204,
      message: "不正确的用户名或密码"
    };
  }
};

/**
 * 使用 Mock 数据，模拟用户信息
 */
const usersInfo = {
  "dingsun-token": {
    name: "定损员",
    introduction: "定损员可以提交审核申请",
    avatar: "/avatar/memberOfLosses.svg",
    roles: ["定损员"]
  }
};

exports.mockGetInfo = (token) => {
  const userInfo = usersInfo[token];

  if (userInfo) {
    // 有相应的用户信息，说明 token 正确
    return {
      code: 20000,
      data: userInfo
    }
  } else {
    // token 不存在
    return {
      code: 50008,
      message: "登录失败，无法获取用户信息"
    }
  }
}