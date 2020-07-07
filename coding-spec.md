# 编码规范

- 每个页面一个 view，放在 `@/views` 目录下。

- 如果 view 中包含了 component，放在当前目录的 `components` 目录下，例如：`@/views/myView/components`。

- view 中不允许直接调用 REST API，需通过 Local API 来调用 REST 服务。

- view 中的每一个动作，例如：“查询”、“提交” 等，均对应一个 Local API。

- 每个 Local API 单独声明一个模块（方便复用），放在 `@/api` 目录下。

- 每个 Local API 需遵循 [JSDOC](https://jsdoc.app/index.html) 规范进行声明。需详细声明：用途、输入参数、输出参数。

- Local API 通过调用 `@utils/request` 模块来调用 REST 服务。

- 前端开发时，还应编写相应的 mock 模块来进行调试。

  - 在 `./mock` 目录下添加响应的 mock 模块，例如，`my-api-mock.js`：

  ```javascript
  export default [
    {
      // 模拟 user login
      url: '/rest/login',
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
    }
  ]
  ```

  - 修改 `./mock/index.js` 文件，将刚刚定义的 mock 模块添加进去：

  ```javascript
  import myAPIMock from './my-api-mock'
  import table from './table'
  
  const mocks = [
    ...myAPIMock,
    ...table
  ]
  ```

  > 这里使用了 ES6 语法：展开运算符 `...`，是因为可以在 `MyAPIMock.js` 中定义多个 REST API。

- 每个 Local API 对应一个 REST 服务，需在 OpenAPI Spec for REST API 文档中进行相应的描述。

- OpenAPI 文档中，每个 API 的输入、输出，均应显示的定义为 schema，名字以 `Dto` 结尾，以便于区分。

