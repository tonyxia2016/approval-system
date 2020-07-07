<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="报案号" min-width="200">
      <template slot-scope="scope">{{ scope.row.caseNo | orderNoFilter }}</template>
    </el-table-column>
    <!-- <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">¥{{ scope.row.price | toThousandFilter }}</template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
      </template>
    </el-table-column>-->
  </el-table>
</template>

<script>
import { queryApplication } from '@/api/query-application'
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  computed: {
    ...mapGetters(['userid', 'roles'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      queryApplication({ userid: this.userid, roles: this.roles }).then(
        response => {
          this.list = response.data.slice(0, 8)
        }
      )
    }
  }
}
</script>
