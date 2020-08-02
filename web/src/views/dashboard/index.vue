<template>
  <div class="dashboard-container">
    <approver-panel-group v-if="isApprover" :pending-application-count="applications.length" />
    <applicant-panel-group
      v-else
      :rejected-application-count="rejectedList.length"
      :approved-application-count="approvedList.length"
    />
    <approver-shortcut-table v-if="isApprover" :applications="applications" />
    <applicant-shortcut-table v-else :rejected-list="rejectedList" :approved-list="approvedList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTaskList } from '@/api/application'
import ApproverPanelGroup from './Approver/PanelGroup'
import ApproverShortcutTable from './Approver/ShortcutTable'
import ApplicantPanelGroup from './Applicant/PanelGroup'
import ApplicantShortcutTable from './Applicant/ShortcutTable'

export default {
  name: 'Dashboard',
  components: {
    ApproverPanelGroup,
    ApproverShortcutTable,
    ApplicantPanelGroup,
    ApplicantShortcutTable
  },
  data() {
    return {
      applications: [],
      rejectedList: [
        {
          type: '包干修复',
          caseNo: 'PICC-0987654321',
          plateNo: '鄂A-98765'
        }
      ],
      approvedList: []
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
        _this.applications = res.data
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
