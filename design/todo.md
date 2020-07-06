# TODO

本文档讨论设计中尚未明确，或有疑问的部分。



## 一个用户既是“定损员”又是“组长”或“主任”时，对审批分配规则是否有影响？

### Q：

如果一个用户既是“定损员”，又是“组长”或“主任”；或者，一个用户既是“组长”，又是“主任”。那么他提交的申请，可能又流转到自己来审批。当前的规则没有规避这种情况，是否需要处理？

### A：

在目前实际情况下，不会出现一个用户同时时多个角色的情况，因此暂时不考虑修正审批分配规则。



## 在审核中，定损员可以更新申请内容吗？

### Q：

一旦提交了申请，在审批人没有批复前，定损员可以更新申请内容吗？

### A：

目前不支持该操作逻辑，必须在审批人驳回申请后，定损员才可以更新申请内容。



## 谁拥有对所有申请的查询权限？

### Q：

在目前的设计中，每个人都只能查询与自己相关的申请：

- 做为申请人，可以查看自己提交的申请；
- 做为审批人，可以查看自己是**当前**审批人的申请；

那么是否需要设计一个角色（或权限），拥有对所有申请进行查询？包括：

- 所有正在处理的申请；
- 所有历史已经处理完毕的申请。

### A：

目前未知，暂时不考虑。