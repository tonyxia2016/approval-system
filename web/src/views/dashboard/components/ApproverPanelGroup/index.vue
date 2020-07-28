<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-pending">
          <svg-icon icon-class="pending" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">等待审批的申请</div>
          <count-to
            :start-val="0"
            :end-val="pendingApplicationCount"
            :duration="2000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-processing">
          <svg-icon icon-class="processing" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">正在审批的申请</div>
          <count-to
            :start-val="0"
            :end-val="processingApplicationCount"
            :duration="2000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>-->
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
      pendingApplicationCount: 20,
      processingApplicationCount: 8
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

      .icon-pending {
        background: #e9c811;
      }
      .icon-processing {
        background: #36a3f7;
      }

      .card-panel-text {
        color: #36a3f7;
      }

      .card-panel-num {
        color: #36a3f7;
      }
    }

    .icon-pending {
      color: #e9c911;
    }
    .icon-processing {
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
