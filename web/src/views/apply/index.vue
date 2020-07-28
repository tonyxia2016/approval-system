<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="12" :sm="9">
        <application-form :application-detail="applicationDetail" :is-readonly="isReadonly" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span:6, offset:6}" :sm="{span:5, offset:4}">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import store from '@/store'
import ApplicationForm from '@/views/components/ApplicationForm'
import { createApplication } from '@/api/application'

export default {
  components: {
    ApplicationForm
  },
  data() {
    return {
      applicationDetail: {
        state: '初审',
        type: '包干修复',
        applicant: store.getters.username,
        startDate: moment(),
        caseNo: '',
        plateNo: '',
        vehicleModel: '',
        repairePlant: '',
        actualCost: '',
        evaluationCost: '',
        purchasePrice: '',
        agreementAmount: '',
        investigator: '',
        investigateLocation: '',
        investigateDate: '',
        identifier: '',
        insurer: '',
        insured: '',
        finalAmount: '',
        deductible: '',
        occurredDate: '',
        offerDate: '',
        quotedAmount: '',
        targetAmount: ''
      }
    }
  },
  computed: {
    isReadonly() {
      return store.getters.roles.indexOf('定损员') === -1
    }
  },
  methods: {
    submit() {
      const _this = this
      const loading = this.$loading()

      createApplication(this.applicationDetail)
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          Object.assign(_this.applicationDetail, {
            startDate: moment(),
            caseNo: '',
            plateNo: '',
            vehicleModel: '',
            repairePlant: '',
            actualCost: '',
            evaluationCost: '',
            purchasePrice: '',
            agreementAmount: '',
            investigator: '',
            investigateLocation: '',
            investigateDate: '',
            identifier: '',
            insurer: '',
            insured: '',
            finalAmount: '',
            deductible: '',
            occurredDate: '',
            offerDate: '',
            quotedAmount: '',
            targetAmount: ''
          })
        })
        .catch(() => {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        })
        .finally(() => {
          loading.close()
        })
    },
    cancel: () => {}
  }
}
</script>
