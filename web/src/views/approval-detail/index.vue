<template>
  <div>
    <el-row>
      <el-col :span="8">
        <application-form :application-detail="applicationDetail" :is-readonly="true" />
      </el-col>
      <el-col :span="8" :offset="1">
        <approval-history :history="applicationDetail.approvalHistory" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="15">
        <el-button type="primary" plain @click="$router.push({ name: 'Dashboard' })">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ApplicationForm from '@/views/components/ApplicationForm'
import ApprovalHistory from '@/views/components/ApprovalHistory'
import { getHistory } from '@/api/application'

export default {
  components: {
    ApplicationForm,
    ApprovalHistory
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      applicationDetail: []
    }
  },
  async created() {
    this.applicationDetail = (await getHistory(this.id)).data
  }
}
</script>
