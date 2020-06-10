const tokens = {
  // admin: {
  //   token: 'admin-token'
  // },
  // editor: {
  //   token: 'editor-token'
  // },
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
  // 'admin-token': {
  //   roles: ['admin'],
  //   introduction: 'I am a super administrator',
  //   avatar:
  //     'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  //   name: 'Super Admin'
  // },
  // 'editor-token': {
  //   roles: ['editor'],
  //   introduction: 'I am an editor',
  //   avatar:
  //     'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  //   name: 'Normal Editor'
  // },
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
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]

      // mock error
      if (!token || password !== '123') {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
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
    url: '/user/info.*',
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
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
