# Camunda 快速入门



## 下载和安装

使用 Docker 部署最方便。

```bash
$ docker pull camunda/camunda-bpm-platform:latest
$ docker run -d --rm -p 8080:8080 camunda/camunda-bpm-platform:latest
```



## 设计一个自动执行流程

使用 Camunda Modeler 设计一个简单流程，并使用 Node.JS 来执行流程中的自动化步骤。

### 创建一个付款流程

<img src="payment-step-1.png" alt="payment" style="zoom: 40%;" />

- Start Evnet：所有流程都启动于“开始事件”。
  - 设置名字：**要求付款**
- End Event：所有流程都终止于“结束事件”。
  - 设置名字：**收到付款**
- Task：“任务”是**流程活动（Activity）**的一种，它具体又可分为：**User Task**、**Service Task** 等等。
  - 设置名字：**信用卡付款**
  - 设置 Task 类型：**Service Task**。Service Task 是对**“自动执行步骤”**的建模。
  - 设置 Service Task 的实现方法（Details -> Implementation）：**External**。外部实现是指：Service Task 会调用一个外部服务来实现自动化步骤。Camunda 是用 Java 实现的，在纯 Java 环境中（例如：Spring Boot），可以选择使用 Java Class 来实现自动化步骤。对于 Node.JS 开发者，Camunda 提供了自动化步骤的**外部实现**方式，并封装了 **camunda-external-task-client-js** 库，来帮助 Node.JS 开发者方便的实现外部服务。
  - 设置外部服务名称：**charge-card**
- Process：“流程”。点击空白处，对流程进行设置。
  - 设置 Id：**payment-retrieval**。和 Task 不一样，Task Id 只是流程引擎使用，可以由 Modeler 自动生成一个唯一的 Id，无需手动修改。流程 Id 则在用户部署、创建、查询、操作流程时都会用到。因此给流程 Id 起一个有明确意义、容易记忆的名字非常重要。
    - 流程 Id 是否支持中文，尚未测试。但是考虑到兼容性，在 rest api、function parameter 中使用中文，可能导致未知的问题，因此不要使用中文。
    - 考虑到 rest api 中会引用流程 Id，因此 Id 应遵从 **“kebab-case”** 命名规范，即：所有的字母都小写；单词和单词之间使用 **-** 进行连接。例如："the-quick-brown-fox-jumps-over-the-lazy-dog"

### 使用 Node.JS 实现一个外部服务执行器（Worker）

#### External Task 的实现机制

Camunda External Service Task 采用了和 Flowable HTTP Service Task 完全不一样的实现机制。

Flowable HTTP Service Task 的实现非常直接：

- 外部的 HTTP Service 是一个 HTTP server；
- Flowable 引擎在执行 HTTP Service Task 时，将向 HTTP Service 发出一个 REST API Call；
- Service 执行完毕后，返回结果。

Camunda External Service Task 则采用了完全不同的实现方式：

- Camunda 引擎生成一个 External Task List；
- 外部 Worker 启动时，将向 Camunda 订阅（subscribe）某个 External Task Topic（也就是绑定在某个 External Task 上）；
- Camunda 引擎在执行 External Service Task 时，会向指定的 External Task Topic 发出请求，该请求被转发给绑定的 Worker；
- Worker 执行完毕后，返回结果。

![External Task 工作模式](external-task-pattern.png)

与 Flowable 不同，Camunda 的实现方式中，Worker 是一个 HTTP Client，而不是一个 HTTP Server。Worker 向 Camunda 发出注册请求，在引擎没有调用 External Service 的时候，Worker 会休眠，直到：

- 有 External Task 的调用，Worker 将执行并返回结果。
- Timeout，Worker 将重新连接。

这种方式称为：Long Polling（长轮询），能有效的提高通信效率。

![External Task 的长轮询机制](external-task-long-polling.png)

#### 添加 camunda-external-task-client-js 库

[Camunda External Task Client JS](https://github.com/camunda/camunda-external-task-client-js) 是 Camunda 官方提供的，用于实现 Long Polling External Task Client 的 JS 库。

```bash
$ npm install camunda-external-task-client-js --save
```

#### Node.JS 实现

```javascript
const { Client, logger } = require('camunda-external-task-client-js');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('charge-card', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const amount = task.variables.get('amount');
  const item = task.variables.get('item');

  console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

  // Complete the task
  await taskService.complete(task);
});
```

上述代码没有做什么实质性的操作，仅仅读取、显示了 Task 中的变量数据。

> 在启动 Camunda BPM Platform 之前，启动 Worker 也没问题，但是会报错，例如：
>
> ```bash
> $ node worker.js
> ✓ subscribed to topic charge-card
> ✖ polling failed with RequestError: connect ECONNREFUSED 127.0.0.1:8080
> ✖ polling failed with RequestError: connect ECONNREFUSED 127.0.0.1:8080
> ✖ polling failed with RequestError: connect ECONNREFUSED 127.0.0.1:8080
> ```



## 部署、启动流程

在 Modeler 中可以直接部署流程，REST Endpoint：http://localhost:8080/engine-rest。

调用 REST API 创建流程实例：

```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"variables": {"amount": {"value":555,"type":"long"}, "item": {"value":"item-xyz"} } }' http://localhost:8080/engine-rest/process-definition/key/payment-retrieval/start
```

可以观察到，worker.js 被调用：

```bash
$ node worker.js
✓ subscribed to topic charge-card
Charging credit card with an amount of 555€ for the item 'item-xyz'...
✓ completed task acb66f40-b118-11ea-9dcd-0242ac140002
```



## 添加人工干预流程

使用 User Task 来对需要人工干预的步骤进行建模。

<img src="/Users/rlee/approval-system/guide/payment-step-2.png" style="zoom:40%;" />

- 插入一个 User Task，设置名字：**审核账单**
- 添加三个 Forms Fields：**amount、item、approved**。人工干预时，需要知道一些信息，并输出干预结果，这些变量被定义在 Forms 中。在本例中：需要从上一步骤（创建流程）获取 amount 和 item 字段，并输出 approved 字段。

部署该流程。

> 由于流程 Id 没有改变，因此在 cockpit 中不会看到新部署了流程，而是对 *payment-retrieval* 流程添加了一个新的版本。这对修改流程非常有用，我们可以保留多个流程版本，并指定现在使用哪个版本。默认执行有效的最新版本。

创建流程实例：

```bash
curl -H "Content-Type: application/json" -X POST -d '{"variables": {"amount": {"value":555,"type":"long"}, "item": {"value":"item-step-2"} } }' http://localhost:8080/engine-rest/process-definition/key/payment-retrieval/start
```

> 官方教程通过 tasklist app 来创建流程，用 REST API 更简单。

通过 tasklist app 观察流程状态，会发现：

- 流程停在了**“审核账单“**这个步骤，等待用户操作。
- 在 Form 中可以看到上一个环节带入的数据 **“amount”、“item”**
- 在 Form 中可以修改数据 **“approved”**，并完成当前步骤。

> 以上步骤也完全可以通过 REST API 来完成。
>
> - 获取 demo 用户的 Task 列表。
>
> ```bash
> $ curl -X GET http://localhost:8080/engine-rest/task\?assignee\=demo
> ```
>
> ​		得到以下结果（已对 JSON 进行了格式化）
>
> ```json
> [
> 	{
> 		"id": "a2968db3-b135-11ea-a979-0242ac150003",
> 		"name": "审核账单",
> 		"assignee": "demo",
> 		"created": "2020-06-18T07:30:50.738+0000",
> 		"due": null,
>     "followUp": null,
>     "delegationState": null,
>     "description": null,
>     "executionId": "a295a34c-b135-11ea-a979-0242ac150003",
>     "owner": null,
>     "parentTaskId": null,
>     "priority": 50,
>     "processDefinitionId": "payment-retrieval:2:5ac31a2b-b135-11ea-a979-0242ac150003",
>     "processInstanceId": "a295a34c-b135-11ea-a979-0242ac150003",
>     "taskDefinitionKey": "Activity_1ovahsy",
>     "caseExecutionId": null,
>     "caseInstanceId": null,
>     "caseDefinitionId": null,
>     "suspended": false,
>     "formKey": null,
>     "tenantId": null
> 	}
> ]
> ```
>
> > 在官方教程中，会得到 3 个结果（其中两个是官方发布时的示例），这里省略了官方示例中的查询结果。
>
> - 查看 Form 的数据。
>
> ```bash
> curl -X GET http://localhost:8080/engine-rest/task/a2968db3-b135-11ea-a979-0242ac150003/form-variables
> ```
>
> > "a2968db3-b135-11ea-a979-0242ac150003" 是在上一步查询时得到的 task id。
>
> ​		得到以下结果（已对 JSON 进行了格式化）
>
> ```json
> {
>    "amount": {
>       "type": "Long",
>       "value": 555,
>       "valueInfo": {}
>    },
>    "item": {
>       "type": "String",
>       "value": "item-step-2",
>       "valueInfo": {}
>    },
>    "approved": {
>       "type": "Boolean",
>       "value": null,
>       "valueInfo": {}
>    }
> }
> ```
>
> - 更新 Form 数据，并完成当前步骤。
>
> ```bash
> curl -H "Content-Type: application/json" -X POST \
> -d '{"variables":{"approved":{"value":true}}}' \ 
> http://localhost:8080/engine-rest/task/a2968db3-b135-11ea-a979-0242ac150003/submit-form
> ```
>
> > "a2968db3-b135-11ea-a979-0242ac150003" 是在上一步查询时得到的 task id。



## 添加流程分支



## 添加自动决策

使用 DMN 引擎，可以由 Camunda 自动进行决策，而无需编写代码。

