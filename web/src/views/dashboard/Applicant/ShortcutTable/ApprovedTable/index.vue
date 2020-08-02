<template>
  <el-table :data="approvedList" style="width: 100%">
    <el-table-column label="序号" type="index" align="center" />
    <el-table-column label="申请类型" prop="type" align="center" />
    <el-table-column label="报案号（后8位）" prop="caseNo" align="center">
      <template slot-scope="scope">{{ scope.row.caseNo.slice(-8) }}</template>
    </el-table-column>
    <el-table-column label="车牌号" prop="plateNo" />
  </el-table>
</template>

<script>
export default {
  props: {
    approvedList: {
      type: Array,
      required: true
    }
  }
}
</script>
