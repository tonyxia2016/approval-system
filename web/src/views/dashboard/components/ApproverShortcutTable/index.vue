<template>
  <el-table :data="applications" stripe>
    <el-table-column label="序号" type="index" />
    <el-table-column label="申请类型" prop="type" />
    <el-table-column label="申请人" prop="applicant" align="center" />
    <el-table-column label="申请时间" prop="startDate" sortable align="center" />
    <el-table-column label="报案号（后8位）" prop="caseNo" sortable />
    <el-table-column label="车牌号" prop="plateNo" sortable />
    <el-table-column label="操作">
      <template>
        <el-button type="primary" plain>审核</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      applications: []
    }
  },
  created() {
    // TODO: 根据用户名和用户角色来查询相关的审批案件
  }
}
</script>
