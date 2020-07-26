<template>
  <div>
    <el-table :data="applications">
      <el-table-column
        label="申请类型"
        prop="type"
        :filters="[{'text': '包干修复', 'value': '包干修复'}, {'text': '高价值件', 'value': '高价值件'}, {'text': '总成部件', 'value': '总成部件'}, {'text': '调价申请', 'value': '调价申请'}]"
        :filter-method="filterHandler"
      />
      <el-table-column label="报案号（后8位）" prop="caseNo" sortable />
      <el-table-column label="车牌号" prop="plateNo" sortable />
      <el-table-column label="申请人" prop="applicant" align="center" />
      <el-table-column label="申请提交时间" prop="startDate" sortable align="center" />
      <el-table-column label="审批时间" prop="approvalDate" sortable align="center" />
      <el-table-column label="审批人" prop="approver" align="center" />
      <el-table-column
        label="状态"
        prop="status"
        align="center"
        :filters="[{'text': '同意', 'value': '同意'}, {'text': '驳回', 'value': '驳回'}, {'text': '等待审批', 'value': '等待审批'}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTagFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '驳回'" size="medium" type="primary" plain>更新申请</el-button>
          <el-button v-else size="medium" plain>查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusTagFilter(status) {
      const statusMap = {
        审批中: 'warning',
        同意: 'success',
        驳回: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    applications: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
