# Api.ProcessApi

All URIs are relative to *http://localhost:3001/process*

Method | HTTP request | Description
------------- | ------------- | -------------
[**approval**](ProcessApi.md#approval) | **POST** /approval | 审核
[**getPendingTask**](ProcessApi.md#getPendingTask) | **GET** /task/{id} | 获取任务详情
[**getPendingTaskList**](ProcessApi.md#getPendingTaskList) | **POST** /task | 获取任务列表
[**getPendingTaskListCount**](ProcessApi.md#getPendingTaskListCount) | **POST** /task/count | 获取任务列表的总项数
[**start**](ProcessApi.md#start) | **POST** /start | 创建流程实例
[**updatePendingTask**](ProcessApi.md#updatePendingTask) | **PUT** /task/{id} | 更新申请内容

<a name="approval"></a>
# **approval**
> approval(body)

审核

审核人通过审核界面，给出审核决定。

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let body = new Api.ApprovalDetails(); // ApprovalDetails | 

apiInstance.approval(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ApprovalDetails**](ApprovalDetails.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getPendingTask"></a>
# **getPendingTask**
> InlineResponse2002 getPendingTask(id)

获取任务详情

根据 task id 获取任务详情

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let id = "id_example"; // String | 任务 id

apiInstance.getPendingTask(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| 任务 id | 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getPendingTaskList"></a>
# **getPendingTaskList**
> [&#x27;String&#x27;] getPendingTaskList(body, opts)

获取任务列表

获取和本人相关的待处理任务列表。即：指定给本人的任务，或本人所在组在任务的候选用户组列表中。 - 支持分页。 - 在获取列表前，可以通过 &#x60;POST /task/count&#x60; API 来获取结果的总数。 - 支持查询其它条件。可查询条件包括：    - 申请类型    - 案件号      - 车牌号 

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let body = new Api.TaskQuery(); // TaskQuery | 
let opts = { 
  'firstResult': 56 // Number | 第一条结果的索引，用于分页。
  'maxResults': 56 // Number | 返回结果的最大条数，用于分页。
};
apiInstance.getPendingTaskList(body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**TaskQuery**](TaskQuery.md)|  | 
 **firstResult** | **Number**| 第一条结果的索引，用于分页。 | [optional] 
 **maxResults** | **Number**| 返回结果的最大条数，用于分页。 | [optional] 

### Return type

**[&#x27;String&#x27;]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getPendingTaskListCount"></a>
# **getPendingTaskListCount**
> InlineResponse2001 getPendingTaskListCount(body)

获取任务列表的总项数

获取和本人相关的待处理任务列表总项数。 - 支持查询其它条件。可查询条件包括：    - 申请类型    - 案件号      - 车牌号 

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let body = new Api.TaskQuery(); // TaskQuery | 

apiInstance.getPendingTaskListCount(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**TaskQuery**](TaskQuery.md)|  | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="start"></a>
# **start**
> InlineResponse200 start(body)

创建流程实例

申请人在“申请页面”填写相关信息并提交申请，将调用此 API 来创建一个审批流程实例。

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let body = new Api.ApplicationDetails(); // ApplicationDetails | 

apiInstance.start(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ApplicationDetails**](ApplicationDetails.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updatePendingTask"></a>
# **updatePendingTask**
> updatePendingTask(bodyid)

更新申请内容

更新申请内容。

### Example
```javascript
import Api from '_api';

let apiInstance = new Api.ProcessApi();
let body = new Api.ApplicationDetails(); // ApplicationDetails | 
let id = "id_example"; // String | 任务 id

apiInstance.updatePendingTask(bodyid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ApplicationDetails**](ApplicationDetails.md)|  | 
 **id** | **String**| 任务 id | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

