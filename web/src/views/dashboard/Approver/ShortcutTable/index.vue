<template>
  <el-table :data="applications" stripe :default-sort="{ prop: 'startDate', order: 'descending'}">
    <el-table-column label="序号" type="index" align="center" />
    <el-table-column label="申请类型" prop="type" align="center" width="100px" />
    <el-table-column label="申请人" prop="applicantName" align="center" width="100px" />
    <el-table-column label="申请时间" prop="startDate" sortable align="center" width="200px">
      <template slot-scope="scope">{{ formatDate(scope.row.startDate) }}</template>
    </el-table-column>
    <el-table-column label="报案号（后8位）" prop="caseNo" align="center" width="200px">
      <template slot-scope="scope">{{ scope.row.caseNo.slice(-8) }}</template>
    </el-table-column>
    <el-table-column label="车牌号" prop="plateNo" sortable width="200px" />
    <el-table-column label="操作" align="left">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" plain @click="startApproval(scope.row.id)">审批</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    applications: {
      type: Array,
      required: true
    }
  },
  computed: {
    formatDate() {
      return date => {
        return moment(date || moment())
          .format('YYYY 年 MM 月 DD 日')
          .toString()
      }
    }
  },
  methods: {
    startApproval(id) {
      /* eslint-disable */
      this.$router.push({ name: '审批', params: { id } })
    }
  }
}
</script>
