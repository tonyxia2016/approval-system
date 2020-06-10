<template>
  <div class="dashboard-container">
    <el-col :offset="3" :span="18">
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form ref="search-bar" :model="searchBar">
            <el-form-item>
              <el-input
                v-model="searchBar.keyWord"
                placeholder="请输入要搜索的车牌号、报案号"
              >
                <el-button slot="append">
                  搜索
                </el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider class="dashboard-divider" content-position="right"> 筛选条件 </el-divider>
      <el-row>
        <el-form ref="filter" :model="filter" label-width="120px">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="filter.period"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              :picker-options="datePickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-radio-group v-model="filter.approvalState">
              <el-radio label="全部"></el-radio>
              <el-radio label="审批中"></el-radio>
              <el-radio label="驳回"></el-radio>
              <el-radio label="已通过"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>
      <el-divider class="dashboard-divider"> </el-divider>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      searchBar: {
        keyWord: ''
      },
      filter: {
        period: ['', ''], // 默认值为空
        approvalState: '全部'
      },
      datePickerOptions: {
        shortcuts: [
          {
            text: '全部',
            onClick(picker) {
              const end = new Date()
              const start = new Date('2020-1-1')
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
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
