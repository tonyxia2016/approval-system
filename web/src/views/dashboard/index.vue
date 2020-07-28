<template>
  <div class="dashboard-container">
    <approver-panel-group v-if="isApprover" />
    <panel-group v-else />
    <approver-shortcut-table v-if="isApprover" :username="username" :roles="roles" />
    <application-status-table v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['name', 'username', 'roles']),
    isApprover() {
      return this.roles.indexOf('定损员') === -1
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
