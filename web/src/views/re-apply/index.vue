<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="10" :sm="9" :lg="7">
        <application-form :application-detail="applicationDetail" :is-readonly="false" />
      </el-col>
      <el-col :lg="{span: 8, offset: 1}">
        <approval-history :history="history" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span:6, offset:6}" :sm="{span:5, offset:4}">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="submit">修改</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import moment from 'moment'
import { getApplicationDetail, updateApplication } from '@/api/application'
import ApplicationForm from '@/views/components/ApplicationForm'
import ApprovalHistory from '@/views/components/ApprovalHistory'

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
      applicationDetail: {},
      history: []
    }
  },
  created() {
    const _this = this
    getApplicationDetail(this.id).then(res => {
      _this.applicationDetail = res.data
      _this.history = res.data.approvalHistory
    })
  },
  methods: {
    async submit() {
      await updateApplication(this.applicationDetail)
      this.$message({
        type: 'success',
        message: '更新成功！'
      })
      this.$router.push({ name: 'Dashboard' })
    },
    cancel() {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
