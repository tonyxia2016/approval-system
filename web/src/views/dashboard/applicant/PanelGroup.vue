<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleQueryApplication('pedding')">
        <div class="card-panel-icon-wrapper icon-pedding">
          <svg-icon icon-class="pedding" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">正在处理的申请</div>
          <count-to
            :start-val="0"
            :end-val="peddingApplicationCount"
            :duration="2000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleQueryApplication('rejected')">
        <div class="card-panel-icon-wrapper icon-rejected">
          <svg-icon icon-class="rejected" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">被驳回的申请</div>
          <count-to
            :start-val="0"
            :end-val="rejectedApplicationCount"
            :duration="2000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleQueryApplication('approved')">
        <div class="card-panel-icon-wrapper icon-approved">
          <svg-icon icon-class="approved" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">近7天批准的申请</div>
          <count-to
            :start-val="0"
            :end-val="approvedApplicationCount"
            :duration="2000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <el-dropdown trigger="click" style="width: 100%;">
        <div class="card-panel">
          <el-col :span="8">
            <div class="card-panel-icon-wrapper icon-new">
              <svg-icon icon-class="new" class-name="card-panel-icon" />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="card-panel-description" style="margin-top: 45px;">
              <div class="card-panel-text">提交新申请</div>
            </div>
          </el-col>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>包干修复</el-dropdown-item>
          <el-dropdown-item>高价值件</el-dropdown-item>
          <el-dropdown-item>总成部件</el-dropdown-item>
          <el-dropdown-item>调价申请</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      peddingApplicationCount: 20,
      rejectedApplicationCount: 8,
      approvedApplicationCount: 30
    }
  },
  methods: {
    handleQueryApplication(type) {
      switch (type) {
        case 'pendding': // 正在处理的申请
          break
        case 'rejected': // 被驳回的申请
          break
        case 'approved': // 已批准的申请
          break
      }
    },
    queryPenddingApplicationCount() {
      // 查询正在处理的申请总数
    },
    queryRejectedApplicationCount() {
      // 查询被驳回的申请总数
    },
    queryApprovedApplicationCount() {
      // 查询已批准的申请总数
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-pedding {
        background: #e9c811;
      }
      .icon-rejected {
        background: #e01414;
      }
      .icon-approved {
        background: #15d515;
      }
      .icon-new {
        background: #36a3f7;
      }

      .card-panel-text {
        color: #36a3f7;
      }

      .card-panel-num {
        color: #36a3f7;
      }
    }

    .icon-pedding {
      color: #e9c911;
    }
    .icon-rejected {
      color: #e01414;
    }
    .icon-approved {
      color: #15d515;
    }
    .icon-new {
      color: #36a3f7;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      text-align: center;
      font-weight: bold;
      margin: 26px;
      color: rgba(0, 0, 0, 0.45);

      .card-panel-text {
        line-height: 18px;
        font-size: 18px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 30px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
