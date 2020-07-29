<template>
  <div class="dashboard-container">
    <approver-panel-group v-if="isApprover" :pending-application-count="applications.length" />
    <panel-group v-else />
    <approver-shortcut-table v-if="isApprover" :applications="applications" />
    <application-status-table v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTaskList } from '@/api/application'
import { getName } from '@/api/user'
import ApproverPanelGroup from './components/ApproverPanelGroup'
import ApproverShortcutTable from './components/ApproverShortcutTable'
import PanelGroup from './applicant/PanelGroup'
import ApplicationStatusTable from './applicant/ApplicationStatusTable'

export default {
  name: 'Dashboard',
  components: {
    ApproverPanelGroup,
    ApproverShortcutTable,
    PanelGroup,
    ApplicationStatusTable
  },
  data() {
    return {
      applications: []
    }
  },
  computed: {
    ...mapGetters(['name', 'username', 'roles']),
    isApprover() {
      return this.roles.indexOf('定损员') === -1
    }
  },
  created() {
    const _this = this
    if (this.isApprover) {
      // 是审批人
      // 根据用户名和用户角色来查询相关的审批案件
      getTaskList({
        username: this.username,
        roles: this.roles
      }).then(res => {
        // 在详情中添加 applicant 的真实姓名
        _this.applications = []
        for (const item of res.data) {
          getName(item.applicant).then(name => {
            _this.applications.push({ ...item, applicantName: name.data })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-divider {
    margin-top: 0;
  }
}
</style>
