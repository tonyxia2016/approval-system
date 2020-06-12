# 上报审批流程设计



## 角色设计

| 序号 | 角色                  | 说明                          |
| :--: | --------------------- | ----------------------------- |
|  1   | losers                | 定损员                        |
|  2   | leaders               | 组长                          |
|  3   | leaders_review_type_1 | 类型1（包干修复）审批责任组长 |
|  4   | leaders_review_type_2 | 类型2（高价值件）审批责任组长 |
|  5   | leaders_review_type_3 | 类型3（总成部件）审批责任组长 |
|  6   | leaders_review_type_4 | 类型4（调价申请）审批责任组长 |
|  7   | directors             | 主任                          |



## 用户模拟数据

| 序号 | 用户名 | 姓名 | 角色                           |
| :--: | ------ | ---- | ------------------------------ |
|  1   | huangq | 黄强 | directors                      |
|  2   | qiaot  | 乔涛 | leaders                        |
|  3   | shig   | 史刚 | leaders_review_type_1、leaders |
|  4   | chenl  | 陈磊 | leaders_review_type_2、leaders |
|  5   | lun    | 卢娜 | leaders_review_type_3、leaders |
|  6   | liup   | 刘平 | leaders_review_type_4、leaders |
|  7   | leij   | 雷娟 | losers                         |



## 流程设计

![image-20200604162859441](./review-process.png)





## 流程测试

### 测试前的准备工作

- 在 modeler 中绘制业务流程图，并下载流程模型
- 部署流程模型：`POST repository/deployments`

```bash
$ curl -X POST -F "file=@审核流程.bpmn20.xml" http://admin:test@localhost:9000/flowable-task/process-api/repository/deployments
{"id":"62d44ad6-a617-11ea-ac1f-0242ac140003","name":"审核流程","deploymentTime":"2020-06-04T03:56:36.076Z","category":null,"parentDeploymentId":null,"url":"http://localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003","tenantId":""}
```

- 检查模型是否装载成功：`GET repository/deployments`

```bash
$ curl -X GET http://admin:test@localhost:9000/flowable-task/process-api/repository/deployments
{"data":[{"id":"62d44ad6-a617-11ea-ac1f-0242ac140003","name":"审核流程","deploymentTime":"2020-06-04T03:56:36.076Z","category":null,"parentDeploymentId":null,"url":"http://localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003","tenantId":""}],"total":1,"start":0,"sort":"id","order":"asc","size":1}
```

- 检查是否正确生成了流程定义：`GET repository/process-definitions`

```bash
$ curl -X GET http://admin:test@localhost:9000/flowable-task/process-api/repository/process-definitions
{"data":[{"id":"review_process:1:62e90b59-a617-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:62e90b59-a617-11ea-ac1f-0242ac140003","key":"review_process","version":1,"name":"审核流程","description":null,"tenantId":"","deploymentId":"62d44ad6-a617-11ea-ac1f-0242ac140003","deploymentUrl":"http://localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003","resource":"http://localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003/resources/审核流程.bpmn20.xml","diagramResource":"http://localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003/resources/审核流程.review_process.png","category":"http://www.flowable.org/processdef","graphicalNotationDefined":true,"suspended":false,"startFormDefined":false}],"total":1,"start":0,"sort":"name","order":"asc","size":1}
```

- 删除流程模型：`DELETE repository/deployments/{deploymentId}`

```bash
$ curl -X DELETE http://admin:test@localhost:9000/flowable-task/process-api/repository/deployments/62d44ad6-a617-11ea-ac1f-0242ac140003
```

> 修改部署流程，需要先删除流程，再重新部署。



### 测试用例1：正常审批流程

```mermaid
graph TD
A(定损员发起申请) --> B(初审组长获取申请列表) --> C(初审组长获取申请详情) --> D(初审组长同意申请)
```


| 序号 | 测试点                         | 测试方法                                | 结果 |
| :--: | ------------------------------ | --------------------------------------- | ---- |
|  1   | 定损员是否成功发起申请？       | 在flowable-task管理器中观察流程图       | 通过 |
|  2   | 初审组长能否获取该条申请？     | 调用 Query of tasks API                 | 通过 |
|  3   | 其他组长是否无法获取该条申请？ | 同上                                    | 通过 |
|  4   | 初审组长能否获取申请详情？     | 调用 Get all variables for a task API   | 通过 |
|  5   | 初审组长同意申请               | 调用 Task actions API                   | 通过 |
|  6   | 申请流程是否正确结束？         | 在flowable-task管理器中观察流程是否消失 | 通过 |


- 定损员发起申请：`POST runtime/process-instances`

```bash
$ curl -X POST -H "Content-Type: application/json" -d @create-review-process.json http://admin:test@localhost:9000/flowable-task/process-api/runtime/process-instances
{"id":"9edc2167-a637-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/runtime/process-instances/9edc2167-a637-11ea-ac1f-0242ac140003","name":null,"businessKey":null,"suspended":false,"ended":false,"processDefinitionId":"review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","processDefinitionUrl":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","processDefinitionName":"审核流程","processDefinitionDescription":null,"activityId":null,"startUserId":"admin","startTime":"2020-06-04T07:47:20.686Z","variables":[{"name":"修理厂名称","type":"string","value":"中升奔驰","scope":"local"},{"name":"评估底价","type":"integer","value":10000,"scope":"local"},{"name":"一次性协议定损金额","type":"integer","value":150000,"scope":"local"},{"name":"定损时间","type":"string","value":"2020-06-03","scope":"local"},{"name":"新车购置价","type":"integer","value":300000,"scope":"local"},{"name":"定损员","type":"string","value":"雷娟","scope":"local"},{"name":"reviewType","type":"integer","value":1,"scope":"local"},{"name":"车牌号","type":"string","value":"鄂A12345","scope":"local"},{"name":"车辆型号","type":"string","value":"奔驰C200","scope":"local"},{"name":"报案号","type":"string","value":"","scope":"local"},{"name":"实际价值","type":"integer","value":20000,"scope":"local"}],"callbackId":null,"callbackType":null,"referenceId":null,"referenceType":null,"tenantId":"","completed":false}
```

- 初审组长获取申请列表：`POST query/tasks`

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "candidateOrAssigned": "shig" }' http://admin:test@localhost:9000/flowable-task/process-api/query/tasks
{"data":[{"id":"9edc488a-a637-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/runtime/tasks/9edc488a-a637-11ea-ac1f-0242ac140003","owner":null,"assignee":null,"delegationState":null,"name":"包干修复初审","description":null,"createTime":"2020-06-04T07:47:20.687Z","dueDate":null,"priority":50,"suspended":false,"claimTime":null,"taskDefinitionKey":"sid-6FE397E1-29E8-411F-A25E-119FD1AD8B5D","scopeDefinitionId":null,"scopeId":null,"scopeType":null,"tenantId":"","category":null,"formKey":null,"parentTaskId":null,"parentTaskUrl":null,"executionId":"9edc4884-a637-11ea-ac1f-0242ac140003","executionUrl":"http://localhost:9000/flowable-task/process-api/runtime/executions/9edc4884-a637-11ea-ac1f-0242ac140003","processInstanceId":"9edc2167-a637-11ea-ac1f-0242ac140003","processInstanceUrl":"http://localhost:9000/flowable-task/process-api/runtime/process-instances/9edc2167-a637-11ea-ac1f-0242ac140003","processDefinitionId":"review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","processDefinitionUrl":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","variables":[]}],"total":1,"start":0,"sort":"id","order":"asc","size":1}
```

- 其他组长无法获取该条申请列表：

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "candidateOrAssigned": "lun" }' http://admin:test@localhost:9000/flowable-task/process-api/query/tasks
{"data":[],"total":0,"start":0,"sort":"id","order":"asc","size":0}
```

- 初审组长获取申请详情：`GET runtime/tasks/{taskId}/variables?scope={scope}`

```bash
$ curl http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/9edc488a-a637-11ea-ac1f-0242ac140003/variables
[{"name":"修理厂名称","type":"string","value":"中升奔驰","scope":"global"},{"name":"评估底价","type":"integer","value":10000,"scope":"global"},{"name":"一次性协议定损金额","type":"integer","value":150000,"scope":"global"},{"name":"定损时间","type":"string","value":"2020-06-03","scope":"global"},{"name":"定损员","type":"string","value":"雷娟","scope":"global"},{"name":"新车购置价","type":"integer","value":300000,"scope":"global"},{"name":"reviewType","type":"integer","value":1,"scope":"global"},{"name":"车辆型号","type":"string","value":"奔驰C200","scope":"global"},{"name":"车牌号","type":"string","value":"鄂A12345","scope":"global"},{"name":"报案号","type":"string","value":"","scope":"global"},{"name":"实际价值","type":"integer","value":20000,"scope":"global"}]
```

- 初审组长同意申请：`POST runtime/tasks/{taskId}`

```bash
$ curl -X POST -H "Content-Type: application/json" -d @leader-approved.json http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/9edc488a-a637-11ea-ac1f-0242ac140003
```



### 测试用例2：初审组长平移任务给其他组长

```mermaid
graph TB
A(定损员发起申请) --> B(初审组长获取申请列表) --> C(初审组长指定平移给其他组长)
C --> D(指定组长获取申请列表) --> E(指定组长获取申请详情) --> F(指定组长同意申请)
```

| 序号 | 测试点                         | 测试方法                                             | 结果 |
| :--: | ------------------------------ | ---------------------------------------------------- | ---- |
|  1   | 初审组长发起平移               | 调用 Task actions API，观察flowable-task中的流程状态 | 通过 |
|  2   | 指定组长是否能获取该条申请？   | 调用 Query of tasks API                              | 通过 |
|  3   | 其他组长是否无法获取该条申请？ | 同上                                                 | 通过 |
|  4   | 指定组长是否能获取申请详情？   | 调用 Get all variables for a task API                | 通过 |
|  5   | 指定组长同意申请               | 调用 Task actions API                                | 通过 |
|  6   | 申请流程是否正确结束？         | 在flowable-task管理器中观察流程是否消失              | 通过 |

- 定损员发起申请
- 初审组长获取申请列表
- 初审组长指定平移给其他组长：`POST runtime/tasks/{taskId}`

```bash
$ curl -X POST -H "Content-Type: application/json" -d @leader-claim.json http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/81986577-a63f-11ea-ac1f-0242ac140003
```

- 指定组长获取申请列表：`POST query/tasks`

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "candidateOrAssigned": "qiaot" }' http://admin:test@localhost:9000/flowable-task/process-api/query/tasks
{"data":[{"id":"abbaae9a-a63f-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/runtime/tasks/abbaae9a-a63f-11ea-ac1f-0242ac140003","owner":null,"assignee":"qiaot","delegationState":null,"name":"组长审核","description":null,"createTime":"2020-06-04T08:44:58.251Z","dueDate":null,"priority":50,"suspended":false,"claimTime":null,"taskDefinitionKey":"sid-9F0E590D-9FF0-4F0C-85F4-EA8CAC21DB56","scopeDefinitionId":null,"scopeId":null,"scopeType":null,"tenantId":"","category":null,"formKey":null,"parentTaskId":null,"parentTaskUrl":null,"executionId":"81983e61-a63f-11ea-ac1f-0242ac140003","executionUrl":"http://localhost:9000/flowable-task/process-api/runtime/executions/81983e61-a63f-11ea-ac1f-0242ac140003","processInstanceId":"81983e54-a63f-11ea-ac1f-0242ac140003","processInstanceUrl":"http://localhost:9000/flowable-task/process-api/runtime/process-instances/81983e54-a63f-11ea-ac1f-0242ac140003","processDefinitionId":"review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","processDefinitionUrl":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:136d8ce6-a637-11ea-ac1f-0242ac140003","variables":[]}],"total":1,"start":0,"sort":"id","order":"asc","size":1}
```

- 其他组长无法获得该条申请：

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "candidateOrAssigned": "shig" }' http://admin:test@localhost:9000/flowable-task/process-api/query/tasks
{"data":[],"total":0,"start":0,"sort":"id","order":"asc","size":0}
```

- 指定组长获取申请详情：`GET runtime/tasks/{taskId}/variables?scope={scope}`

```bash
$ curl http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/abbaae9a-a63f-11ea-ac1f-0242ac140003/variables
[{"name":"一次性协议定损金额","type":"integer","value":150000,"scope":"global"},{"name":"定损时间","type":"string","value":"2020-06-03","scope":"global"},{"name":"新车购置价","type":"integer","value":300000,"scope":"global"},{"name":"nextLeader","type":"string","value":"qiaot","scope":"global"},{"name":"reviewType","type":"integer","value":1,"scope":"global"},{"name":"报案号","type":"string","value":"","scope":"global"},{"name":"applicant","type":"string","value":"leij","scope":"global"},{"name":"实际价值","type":"integer","value":20000,"scope":"global"},{"name":"修理厂名称","type":"string","value":"中升奔驰","scope":"global"},{"name":"评估底价","type":"integer","value":10000,"scope":"global"},{"name":"定损员","type":"string","value":"雷娟","scope":"global"},{"name":"车辆型号","type":"string","value":"奔驰C200","scope":"global"},{"name":"车牌号","type":"string","value":"鄂A12345","scope":"global"},{"name":"leaderReviewResult","type":"integer","value":3,"scope":"global"}]
```

- 指定组长同意申请：`POST runtime/tasks/{taskId}`

```bash
$ curl -X POST -H "Content-Type: application/json" -d @leader-approved.json http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/abbaae9a-a63f-11ea-ac1f-0242ac140003
```

