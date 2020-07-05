const tokens = {
  dingsun: {
    token: 'dingsun-token'
  },
  reviewer1: {
    token: 'reviewer1-token'
  },
  reviewer2: {
    token: 'reviewer2-token'
  },
  reviewer3: {
    token: 'reviewer3-token'
  },
  reviewer4: {
    token: 'reviewer4-token'
  },
  leader: {
    token: 'leader-token'
  },
  director: {
    token: 'director-token'
  }
}

const users = {
  'dingsun-token': {
    roles: ['定损员'],
    introduction: '定损员可以提交审核申请',
    avatar: '/avatar/employee.svg',
    name: '定损员'
  }
}

export default [
  // user login
  {
    url: '/users/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]

      // mock error
      if (!token || password !== '123') {
        return {
          code: 60204,
          message: '不正确的用户名或密码'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/users/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/users/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
