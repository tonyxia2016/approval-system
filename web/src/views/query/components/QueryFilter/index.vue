<!--
 * 查询条件组件
 * @author Ryan Li <rlee@163.com>
-->

<template>
  <div>
    <el-form :model="queryForm" label-width="100px" label-position="left">
      <el-form-item label="申请状态" class="query-item">
        <el-radio-group v-model="queryForm.applicationState">
          <el-radio label="全部"></el-radio>
          <el-radio label="等待审批"></el-radio>
          <el-radio label="同意"></el-radio>
          <el-radio label="驳回"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申请类型" class="query-item">
        <el-radio-group v-model="queryForm.applicationType">
          <el-radio label="全部"></el-radio>
          <el-radio label="包干修复"></el-radio>
          <el-radio label="高价值件"></el-radio>
          <el-radio label="总成部件"></el-radio>
          <el-radio label="调价申请"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申请时间" class="query-item">
        <el-radio-group v-model="queryForm.startDate">
          <el-radio
            label="最近7天"
            @change="queryForm.queryPeriod = [Date.now() - 3600 * 1000 * 24 * 7, Date.now()]"
          ></el-radio>
          <el-radio
            label="最近30天"
            @change="queryForm.queryPeriod = [Date.now() - 3600 * 1000 * 24 * 30, Date.now()]"
          ></el-radio>
          <el-radio label="时间段">
            时间段：
            <el-date-picker
              v-model="queryForm.queryPeriod"
              type="daterange"
              range-separator="至"
              size="small"
              :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}"
              @focus="queryForm.startDate = '时间段'"
            ></el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {
        applicationState: '全部',
        applicationType: '全部',
        startDate: '最近7天',
        queryPeriod: [Date.now() - 3600 * 1000 * 24 * 7, Date.now()]
      }
    }
  }
}
</script>

<style scoped>
.query-item {
  margin-bottom: 0px;
}
</style>
