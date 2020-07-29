<template>
  <div class="app-container">
    <h1>审批 - {{ id }}</h1>
    <application-form :application-detail="applicationDetail" :is-readonly="true" />
  </div>
</template>

<script>
import ApplicationForm from '../components/ApplicationForm'
import { getApplicationDetail } from '@/api/application'

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
      applicationDetail: {}
    }
  },
  created() {
    const _this = this
    getApplicationDetail(this.id).then(res => {
      _this.applicationDetail = res.data
    })
  }
}
</script>
