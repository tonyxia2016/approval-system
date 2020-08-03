<template>
  <el-table :data="rejectedList" style="width: 100%">
    <el-table-column label="序号" type="index" align="center" />
    <el-table-column label="申请类型" prop="type" align="center" />
    <el-table-column label="报案号（后8位）" prop="caseNo" align="center">
      <template slot-scope="scope">{{ scope.row.caseNo.slice(-8) }}</template>
    </el-table-column>
    <el-table-column label="车牌号" prop="plateNo" />
    <el-table-column label="操作" align="left">
      <template slot-scope="scope">
        <el-button type="primary" plain size="mini" @click="startReApply(scope.row.id)">修改申请</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    rejectedList: {
      type: Array,
      required: true
    }
  },
  methods: {
    startReApply(id) {
      /* eslint-disable */
      this.$router.push({ name: '修改申请', params: { id } })
    }
  }
}
</script>
