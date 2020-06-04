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
|  7   | leij   | 雷娟 | loasers                        |



## 设计、测试过程

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

- 生成一个`type 1`类型的审核任务：`POST runtime/process-instances`

```bash
$ curl -X POST -H "Content-Type: application/json" -d @create-review-process.json http://admin:test@localhost:9000/flowable-task/process-api/runtime/process-instances
{"id":"bc755f4e-a629-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/runtime/process-instances/bc755f4e-a629-11ea-ac1f-0242ac140003","name":null,"businessKey":null,"suspended":false,"ended":false,"processDefinitionId":"review_process:1:7c0662dd-a627-11ea-ac1f-0242ac140003","processDefinitionUrl":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:7c0662dd-a627-11ea-ac1f-0242ac140003","processDefinitionName":"审核流程","processDefinitionDescription":null,"activityId":null,"startUserId":"admin","startTime":"2020-06-04T06:07:57.390Z","variables":[{"name":"修理厂名称","type":"string","value":"中升奔驰","scope":"local"},{"name":"评估底价","type":"integer","value":10000,"scope":"local"},{"name":"一次性协议定损金额","type":"integer","value":150000,"scope":"local"},{"name":"定损时间","type":"string","value":"2020-06-03","scope":"local"},{"name":"新车购置价","type":"integer","value":300000,"scope":"local"},{"name":"定损员","type":"string","value":"雷娟","scope":"local"},{"name":"reviewType","type":"integer","value":1,"scope":"local"},{"name":"车牌号","type":"string","value":"鄂A12345","scope":"local"},{"name":"车辆型号","type":"string","value":"奔驰C200","scope":"local"},{"name":"报案号","type":"string","value":"","scope":"local"},{"name":"实际价值","type":"integer","value":20000,"scope":"local"}],"callbackId":null,"callbackType":null,"referenceId":null,"referenceType":null,"tenantId":"","completed":false}
```

- 观察每个人的任务列表，应该只有`leaders_review_type_1`组的成员可以看到该任务

```bash
$ curl -G -d "candidateOrAssigned=lun" http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks
{"data":[],"total":0,"start":0,"sort":"id","order":"asc","size":0}
$ curl -G -d "candidateOrAssigned=shig" http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks
{"data":[{"id":"bc75fba1-a629-11ea-ac1f-0242ac140003","url":"http://localhost:9000/flowable-task/process-api/runtime/tasks/bc75fba1-a629-11ea-ac1f-0242ac140003","owner":null,"assignee":null,"delegationState":null,"name":"包干修复初审","description":null,"createTime":"2020-06-04T06:07:57.393Z","dueDate":null,"priority":50,"suspended":false,"claimTime":null,"taskDefinitionKey":"sid-6FE397E1-29E8-411F-A25E-119FD1AD8B5D","scopeDefinitionId":null,"scopeId":null,"scopeType":null,"tenantId":"","category":null,"formKey":null,"parentTaskId":null,"parentTaskUrl":null,"executionId":"bc75866b-a629-11ea-ac1f-0242ac140003","executionUrl":"http://localhost:9000/flowable-task/process-api/runtime/executions/bc75866b-a629-11ea-ac1f-0242ac140003","processInstanceId":"bc755f4e-a629-11ea-ac1f-0242ac140003","processInstanceUrl":"http://localhost:9000/flowable-task/process-api/runtime/process-instances/bc755f4e-a629-11ea-ac1f-0242ac140003","processDefinitionId":"review_process:1:7c0662dd-a627-11ea-ac1f-0242ac140003","processDefinitionUrl":"http://localhost:9000/flowable-task/process-api/repository/process-definitions/review_process:1:7c0662dd-a627-11ea-ac1f-0242ac140003","variables":[]}],"total":1,"start":0,"sort":"id","order":"asc","size":1}
```

- 获取任务中的所有数据

```bash
$ curl http://admin:test@localhost:9000/flowable-task/process-api/runtime/tasks/bc75fba1-a629-11ea-ac1f-0242ac140003/variables
[{"name":"修理厂名称","type":"string","value":"中升奔驰","scope":"global"},{"name":"评估底价","type":"integer","value":10000,"scope":"global"},{"name":"一次性协议定损金额","type":"integer","value":150000,"scope":"global"},{"name":"定损时间","type":"string","value":"2020-06-03","scope":"global"},{"name":"定损员","type":"string","value":"雷娟","scope":"global"},{"name":"新车购置价","type":"integer","value":300000,"scope":"global"},{"name":"车辆型号","type":"string","value":"奔驰C200","scope":"global"},{"name":"车牌号","type":"string","value":"鄂A12345","scope":"global"},{"name":"reviewType","type":"integer","value":1,"scope":"global"},{"name":"报案号","type":"string","value":"","scope":"global"},{"name":"实际价值","type":"integer","value":20000,"scope":"global"}]
```



- "不同意"该次审批
- 观察每个人的任务列表，应该只有`directors`组的成员可以看到该任务
- `directors`结束任务



## 流程设计



## 测试



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



### 测试用例1：正常审批流程

```mermaid
graph LR
A(定损员发起申请) --> B(初审组长获取申请列表) --> C(初审组长获取申请详情) --> D(初审组长同意申请)
```

