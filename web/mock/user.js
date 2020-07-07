const tokens = {
  'xiawei': {
    token: 'xiawei-token'
  },
  'guoping': {
    token: 'guoping-token'
  },
  'zhangyang': {
    token: 'zhangyang-token'
  },
  'lijie': {
    token: 'lijie-token'
  },
  'fengming': {
    token: 'fengming-token'
  },
  'wuchao': {
    token: 'wuchao-token'
  },
  'yuyong': {
    token: 'yuyong-token'
  }
}

const users = {
  'xiawei-token': {
    roles: ['定损员'],
    introduction: '定损员可以提交审核申请',
    avatar: '/avatar/employee.svg',
    name: '夏伟',
    userid: 'xiawei'
  },
  'guoping-token': {
    roles: ['定损员'],
    introduction: '定损员可以提交审核申请',
    avatar: '/avatar/employee.svg',
    name: '郭平',
    userid: 'guoping'
  },
  'zhangyang-token': {
    roles: ['组长', '包干修复初审'],
    introduction: '',
    avatar: '/avatar/employee.svg',
    name: '张洋',
    userid: 'zhangyang'
  },
  'lijie-token': {
    roles: ['组长', '高价值件初审'],
    introduction: '',
    avatar: '/avatar/employee.svg',
    name: '李捷',
    userid: 'lijie'
  },
  'fengming-token': {
    roles: ['组长', '总成部件初审'],
    introduction: '',
    avatar: '/avatar/employee.svg',
    name: '冯明',
    userid: 'fengming'
  },
  'wuchao-token': {
    roles: ['组长', '调价申请初审'],
    introduction: '',
    avatar: '/avatar/employee.svg',
    name: '吴超',
    userid: 'wuchao'
  },
  'yuyong-token': {
    roles: ['主任'],
    introduction: '',
    avatar: '/avatar/employee.svg',
    name: '于勇',
    userid: 'yuyong'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      // 存在 token，说明用户存在；不校验密码（密码任意）
      if (!token) {
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
