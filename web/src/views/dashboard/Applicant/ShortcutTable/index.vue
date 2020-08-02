<template>
  <el-row>
    <el-col :span="13">
      <el-row class="table-title">
        <span>被驳回的申请</span>
      </el-row>
      <el-row>
        <rejected-table :rejected-list="rejectedList" />
      </el-row>
    </el-col>
    <el-col :span="10" :offset="1">
      <el-row class="table-title">
        <span>近7天批准的申请</span>
      </el-row>
      <el-row>
        <approved-table :approval-list="approvalList" />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import RejectedTable from './RejectedTable'
import ApprovedTable from './ApprovedTable'

export default {
  components: {
    RejectedTable,
    ApprovedTable
  },
  props: {
    rejectedList: {
      type: Array,
      required: true
    },
    approvedList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.table-title {
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
