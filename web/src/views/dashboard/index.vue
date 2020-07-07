<template>
  <div class="dashboard-container">
    <panel-group />
    <application-state-table />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './applicant/PanelGroup'
import ApplicationStateTable from './applicant/ApplicationStateTable'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    ApplicationStateTable
  },
  computed: {
    ...mapGetters(['name', 'userid', 'roles'])
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
