<template>
  <div class="app-container">
    <h2>申请详情</h2>
    <application-form :application-detail="applicationDetail" :is-readonly="true" />
    <h2>审批意见</h2>
    <el-form>
      <el-form-item>
        <el-input v-model="approvalComment" type="textarea" :rows="4" placeholder="请输入审批意见"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="conclusion('同意')">同意</el-button>
        <el-button type="danger" plain @click="conclusion('驳回')">驳回</el-button>
        <el-button type="warning" plain @click="conclusion('上报')">上报</el-button>
        <el-button type="info" plain @click="handOver">移交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ApplicationForm from '../components/ApplicationForm'
import SelectLeader from './components/SelectLeader'
import { getApplicationDetail, handleApplication } from '@/api/application'

export default {
  components: {
    ApplicationForm
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
      approvalComment: ''
    }
  },
  created() {
    const _this = this
    getApplicationDetail(this.id).then(res => {
      _this.applicationDetail = res.data
    })
  },
  methods: {
    conclusion(conclusion) {
      const opt = {
        id: this.id,
        conclusion
      }

      handleApplication(opt).then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
    },
    handOver() {
      // 获取组长名单
      const selectLeader = this.$createElement(SelectLeader, {
        ref: 'sl',
        props: {
          leaderList: [
            {
              username: 'zhangyang',
              name: '张洋'
            },
            {
              username: 'lijie',
              name: '李捷'
            }
          ]
        }
      })

      this.$msgbox({
        title: '选择组长',
        message: selectLeader,
        data: 'abc'
      })
        .then(action => {
          this.$message({
            type: 'success',
            message: '移交给：' + this.$refs.sl.leader
          })

          this.$refs.sl.leader = ''
        })
        .catch(msg => {
          this.$message({
            type: 'info',
            message: '取消移交！'
          })

          this.$refs.sl.leader = ''
        })
    }
  }
}
</script>
