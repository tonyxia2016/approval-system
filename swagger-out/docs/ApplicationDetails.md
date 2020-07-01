# Api.ApplicationDetails

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**state** | **String** | 审批状态。开始申请时，状态为“初审”。 | 
**type** | **String** | 审批类型。 | 
**applicant** | **String** | 申请人，也就是定损员。 | 
**startDate** | **String** | 提交申请的时间。 | 
**reportNo** | **String** | 报案号 | [optional] 
**plateNo** | **String** | 车牌号 | [optional] 
**vehicleModel** | **String** | 车辆型号 | [optional] 
**repairPlant** | **String** | 修理厂名称 | [optional] 
**actualCost** | **String** | 实际价值 | [optional] 
**evaluationCost** | **String** | 评估价值 | [optional] 
**purchasePrice** | **String** | 新车购置价 | [optional] 
**agreementAmount** | **String** | 一次性协议定损金额 | [optional] 
**investigator** | **String** | 定损员 | [optional] 
**investigateLocation** | **String** | 定损地点 | [optional] 
**investigateDate** | **String** | 定损时间 | [optional] 
**identifier** | **String** | 识别代码 | [optional] 
**insurer** | **String** | 承保公司 | [optional] 
**insured** | **String** | 被保险人姓名 | [optional] 
**finalAmount** | **String** | 最终价格 | [optional] 
**deductible** | **String** | 自付标准 | [optional] 
**occurredDate** | **String** | 出险时间 | [optional] 
**quoteDate** | **String** | 报价时间 | [optional] 
**quoteAmount** | **String** | 报价金额 | [optional] 
**targetAmount** | **String** | 目标金额 | [optional] 

<a name="StateEnum"></a>
## Enum: StateEnum

* `初审` (value: `"初审"`)
* `复审` (value: `"复审"`)


<a name="TypeEnum"></a>
## Enum: TypeEnum

* `包干修复` (value: `"包干修复"`)
* `高价值件` (value: `"高价值件"`)
* `总成部件` (value: `"总成部件"`)
* `调价申请` (value: `"调价申请"`)

