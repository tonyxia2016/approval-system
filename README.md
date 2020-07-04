# 上报审核系统原型



## Camunda BPM Run 发行版

本项目采用了 **Camunda BPM Run** 发行版。该版本包括了：Camunda webapps（Cockpit，Tasklist，Admin）和 REST API。

对非 Java 开发者以及对设置 Java application server 不熟悉的用户来说，**Run** 发行版可以通过简单配置来运行一个完整的 Camunda BPM。



## 数据库

采用 PostgreSQL 12 作数据持久化。

> 在开源免费的数据库中，Camunda BPM 支持：
>
> - MySQL 5.6 / 5.7
> - MariaDB 10.0 / 10.2 / 10.3
> - PostgreSQL 9.4 / 9.6 / 10.4 / 10.7 / 11.1 / 11.2 / 12.2



## Camunda Engine REST API 参考文档

为了方便开发，在部署 Camunda BPM Run 时，本项目同时部署了 Camunda Engine REST API 参考文档。

REST API 文档采用 **swagger-ui** 渲染 [OpenAPI Spec for Camunda REST API](https://docs.camunda.org/manual/latest/reference/rest/openapi/) 自动生成。

swagger-ui 还支持在线体验、测试 REST API。



## Sidecar

采用 Envoy proxy 实现 Sidecar 功能。

- 将 Camunda BPM 服务端口重定向到 `9001`（*8080* 端口太过热门）。

- 将 swagger-ui 服务与 Camunda BPM 集成到一起。



## Docker 部署 Camunda BPM

执行以下命令进行部署：

```bash
$ cd docker
$ docker-compose up -d
```

该命令启动了以下的服务：

- Camunda BPM Webapps：http://localhost:9001
  - 初始用户名/密码：demo/demo
- Camunda Engine REST API Endpoint：http://localhost:9001/engine-rest
- Camunda Engine REST API Docs：http://localhost:9001/docs

执行以下命令检查 Camunda BPM Engine 是否启动成功：

```bash
$ curl -X GET http://localhost:9001/engine-rest/version
{"version":"7.14.0-SNAPSHOT"}
```



## 部署 BPMN 模型

模型文件包括：

- BPMN 模型： [approval-process.bpmn](process-definition/approval-process.bpmn) 
- DMN 模型： [assign-approver.dmn](process-definition/assign-approver.dmn) 

在部署 Camunda BPM Run 时，自动部署了以上两个模型。

> Camunda BPM Run 启动时将自动部署 `/camunda/configuration/resources/` 目录下的所有文件，包括：BPMN、DMN、CMMN、form 和 script 文件。

> 启动后，也可以执行以下命令部署这两个模型：
>
> ```bash
> $ cd process-definition
> $ curl -X POST "http://localhost:9001/engine-rest/deployment/create" \
> -H "accept: application/json" \
> -H "Content-Type: multipart/form-data" \
> -F "deployment-source=CURL" \
> -F "deployment-name=approval-system" \
> -F "bpmn=@approval-process.bpmn" \
> -F "dmn=@assign-approver.dmn"
> ```



