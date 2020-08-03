<template>
  <div class="app-container">
    <el-row>
      <el-col :span="7">
        <h2>申请详情</h2>
        <application-form :application-detail="applicationDetail" :is-readonly="true" />
      </el-col>
      <el-col :span="7" :offset="1">
        <approval-history :history="applicationDetail.approvalHistory" />
      </el-col>
    </el-row>
    <el-row>
      <h2>审批意见</h2>
      <el-form>
        <el-form-item>
          <el-input
            v-model="approvalComment"
            type="textarea"
            :rows="4"
            placeholder="请输入审批意见"
            style="width: 750px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="conclusion('同意')">同意</el-button>
          <el-button type="danger" plain @click="conclusion('驳回')">驳回</el-button>
          <el-button
            v-if="roles.indexOf('组长') > -1"
            type="warning"
            plain
            @click="conclusion('上报')"
          >上报</el-button>
          <el-button v-if="roles.indexOf('组长') > -1" type="info" plain @click="handOver">移交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import ApplicationForm from '@/views/components/ApplicationForm'
import ApprovalHistory from '@/views/components/ApprovalHistory'
import SelectLeader from './components/SelectLeader'
import {
  getApplicationDetail,
  completeApproval,
  claimApproval
} from '@/api/application'
import { getRoleMember } from '@/api/user'
import { mapGetters } from 'vuex'
import moment from 'moment'

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
      approvalComment: '',
      nextApprover: null
    }
  },
  computed: {
    ...mapGetters(['username', 'name', 'roles'])
  },
  created() {
    const _this = this
    getApplicationDetail(this.id)
      .then(res => {
        _this.applicationDetail = res.data
        return claimApproval({ id: this.id, username: this.username })
      })
      .then(() => {
        return
      })
  },
  methods: {
    conclusion(conclusion) {
      const opt = {
        id: this.id,
        approver: this.username,
        approverName: this.name,
        approvalDate: moment(),
        approvalConclusion: conclusion,
        approvalComment: this.approvalComment
      }
      console.log(opt)

      switch (conclusion) {
        case '上报':
          opt.nextApprover = {
            user: '',
            group: '主任'
          }
          break
        case '移交':
          opt.nextApprover = {
            user: this.nextApprover.username,
            group: ''
          }
          break
      }

      completeApproval(opt).then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
    },
    async handOver() {
      // 获取组长名单
      const res = await getRoleMember('组长')
      // 去除自己
      const leaderList = []
      for (const item of res.data.members) {
        if (item.username !== this.username) {
          leaderList.push(item)
        }
      }

      // const h = this.$createElement
      const selectLeader = this.$createElement(SelectLeader, {
        props: { leaderList }
      })

      try {
        await this.$msgbox({
          title: '选择组长',
          message: selectLeader,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.nextApprover = leaderList.filter(
                item => item.username === selectLeader.componentInstance.leader
              )[0]
            }
            done()
          }
        })
        this.$message({
          type: 'success',
          message: '移交给：' + this.nextApprover.name
        })
        selectLeader.componentInstance.leader = ''
        this.conclusion('移交')
      } catch (err) {
        this.$message({
          type: 'info',
          message: '取消移交！'
        })
      }
    }
  }
}
</script>
