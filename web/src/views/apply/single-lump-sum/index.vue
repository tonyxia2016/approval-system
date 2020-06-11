<template>
  <div class="app-container">
    <h1>包干修复申请</h1>
    <el-form ref="form" :model="form" label-width="150px" style="width: 600px;">
      <el-form-item label="报案号">
        <el-input v-model="form.caseNo" />
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="form.plateNo" />
      </el-form-item>
      <el-form-item label="车辆型号">
        <el-input v-model="form.model" />
      </el-form-item>
      <el-form-item label="修理厂名称">
        <el-input v-model="form.garageName" />
      </el-form-item>
      <el-form-item label="实际价值">
        <el-input v-model="form.actualValue" />
      </el-form-item>
      <el-form-item label="评估底价">
        <el-input v-model="form.assessedValue" />
      </el-form-item>
      <el-form-item label="新车购置价">
        <el-input v-model="form.purchasePrice" />
      </el-form-item>
      <el-form-item label="一次性协商定损金额">
        <el-input v-model="form.singleLumpSum" />
      </el-form-item>
      <el-form-item label="定损员">
        <el-input v-model="form.memberOfLosses" />
      </el-form-item>
      <el-form-item label="定损时间">
        <el-date-picker v-model="form.dateOfLosses" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ `${this.$route.meta.mode === 'create' ? '提出申请' : '修改申请'}` }}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        caseNo: '', // 报案号
        plateNo: '', // 车牌号
        model: '', // 车辆型号
        garageName: '', // 修理厂名称
        actualValue: '', // 实际价值
        assessedValue: '', // 评估底价
        purchasePrice: '', // 新车购置价
        singleLumpSum: '', // 一次性协议定损金额
        memberOfLosses: this.$store.state.user.name, // 定损员
        dateOfLosses: new Date() // 定损时间
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
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
</style>
