<template>
  <el-table :data="history">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form inline>
          <el-form-item label="审批意见">{{ scope.row.approvalComment }}</el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column type="index" width="30px" />
    <el-table-column label="审批人" prop="approverName" align="center" />
    <el-table-column label="审批时间" prop="approvalDate" align="center">
      <template slot-scope="scope">{{ formatDate(scope.row.approvalDate) }}</template>
    </el-table-column>
    <el-table-column label="审批结论" prop="approvalConclusion" align="center" />
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    history: {
      type: Array,
      required: true,
      default() {
        return []
      }
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
  }
}
</script>
