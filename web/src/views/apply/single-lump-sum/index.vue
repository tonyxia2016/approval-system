<template>
  <div class="app-container">
    <h1>包干修复申请</h1>
    <el-form ref="form" :model="form" label-width="150px" style="width: 600px;" :loading="loading">
      <el-form-item label="报案号">
        <el-input v-model="form.caseNo" />
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="form.plateNo" />
      </el-form-item>
      <el-form-item label="车辆型号">
        <el-input v-model="form.vehicleModel" />
      </el-form-item>
      <el-form-item label="修理厂名称">
        <el-input v-model="form.repairePlant" />
      </el-form-item>
      <el-form-item label="实际价值" class="amount_input">
        <el-input v-model="form.actualCost" />
        <span style="color: darkgrey;">{{ formatAmount(form.actualCost) }}</span>
      </el-form-item>
      <el-form-item label="评估底价" class="amount_input">
        <el-input v-model="form.evaluationCost" />
        <span style="color: darkgrey;">{{ formatAmount(form.evaluationCost) }}</span>
      </el-form-item>
      <el-form-item label="新车购置价" class="amount_input">
        <el-input v-model="form.purchasePrice" />
        <span style="color: darkgrey;">{{ formatAmount(form.purchasePrice) }}</span>
      </el-form-item>
      <el-form-item label="一次性协商定损金额" class="amount_input">
        <el-input v-model="form.agreementAmount" />
        <span style="color: darkgrey;">{{ formatAmount(form.agreementAmount) }}</span>
      </el-form-item>
      <el-form-item label="定损员">
        <el-input v-model="form.investigator" />
      </el-form-item>
      <el-form-item label="定损时间">
        <el-date-picker v-model="form.investigateDate" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >{{ `${this.$route.meta.mode === 'create' ? '提出申请' : '修改申请'}` }}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createApplication } from '@/api/application'

export default {
  data() {
    return {
      form: {
        caseNo: '', // 报案号
        plateNo: '', // 车牌号
        vehicleModel: '', // 车辆型号
        repairePlant: '', // 修理厂名称
        actualCost: '', // 实际价值
        evaluationCost: '', // 评估底价
        purchasePrice: '', // 新车购置价
        agreementAmount: '', // 一次性协议定损金额
        investigator: this.$store.state.user.name, // 定损员
        investigateDate: new Date() // 定损时间
      },
      loading: false
    }
  },
  computed: {
    formatAmount() {
      return amount => {
        return Number(amount || '0.00').toLocaleString('zh', {
          minimumFractionDigits: 2
        })
      }
    }
  },
  methods: {
    onSubmit() {
      const _this = this
      this.loading = true

      const applicationDetails = {
        state: `${this.$route.meta.mode === 'create' ? '初审' : '复审'}`,
        type: '包干修复',
        applicant: this.$store.state.user.username,
        startDate: new Date(),
        ...this.form
      }

      createApplication(applicationDetails)
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          Object.assign(_this.form, {
            caseNo: '',
            plateNo: '',
            vehicleModel: '',
            repairePlant: '',
            actualCost: '',
            evaluationCost: '',
            purchasePrice: '',
            agreementAmount: '',
            investigator: this.$store.state.user.name,
            investigateDate: new Date()
          })
        })
        .catch(() => {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        })
        .finally(() => {
          _this.loading = false
        })
    },
    onCancel() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.amount_input {
  margin-bottom: 0px;
}
</style>
