!--
 * 申请单控件
 *
 * @description “申请人”、“审批人”共用申请单控件。对“审批人”该表单只读。
 * @description 该表单同时用于”初审“和”复审“，界面提示略有不同
 * @description 该表单同时用于4种单据的提交和审批，显示的字段略有不同
 * @param {Boolean} isReadonly - 是否只读
 * @param {ApplicationDetail[]} applicationDetail - 申请的详细数据
-->

<template>
  <div>
    <el-form :model="applicationDetail" label-width="150px">
      <el-form-item label="申请类型" :class="isReadonly ? 'is-readonly' : ''">
        <span v-if="isReadonly">{{ applicationDetail.type }}</span>
        <el-select v-else v-model="applicationDetail.type">
          <el-option key="包干修复" label="包干修复" value="包干修复" />
          <el-option key="高价值件" label="高价值件" value="高价值件" />
          <el-option key="总成部件" label="总成部件" value="总成部件" />
          <el-option key="调价申请" label="调价申请" value="调价申请" />
        </el-select>
      </el-form-item>

      <el-form-item label="申请人" :class="isReadonly ? 'is-readonly' : ''">
        <span>{{ applicantName }}</span>
      </el-form-item>

      <el-form-item label="申请日期" :class="isReadonly ? 'is-readonly' : ''">
        <span>{{ formatDate(applicationDetail.startDate) }}</span>
      </el-form-item>

      <el-form-item label="报案号" :class="isReadonly ? 'is-readonly' : ''">
        <span v-if="isReadonly">{{ applicationDetail.caseNo }}</span>
        <el-input v-else v-model="applicationDetail.caseNo" placeholder="请输入报案号，至少后8位" />
      </el-form-item>

      <el-form-item label="车牌号" :class="isReadonly ? 'is-readonly' : ''">
        <span v-if="isReadonly">{{ applicationDetail.plateNo }}</span>
        <el-input v-else v-model="applicationDetail.plateNo" placeholder="请输入车牌号，例如：鄂A-12345" />
      </el-form-item>

      <el-form-item label="车辆型号" :class="isReadonly ? 'is-readonly' : ''">
        <span v-if="isReadonly">{{ applicationDetail.vehicleModel }}</span>
        <el-input v-else v-model="applicationDetail.vehicleModel" placeholder="请输入车辆型号" />
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '包干修复'"
        label="修理厂名称"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.repairePlant }}</span>
        <el-input v-else v-model="applicationDetail.repairePlant" placeholder="请输入修理厂名称" />
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '包干修复'"
        label="实际价值"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.actualCost) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.actualCost" placeholder="请输入实际价值" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.actualCost) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '包干修复'"
        label="评估底价"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.evaluationCost) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.evaluationCost" placeholder="请输入评估底价" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.evaluationCost) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '包干修复'"
        label="新车购置价"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.purchasePrice) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.purchasePrice" placeholder="请输入新车购置价" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.purchasePrice) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '包干修复'"
        label="一次性协商定损金额"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.agreementAmount) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.agreementAmount" placeholder="请输入一次性协商定损金额" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.agreementAmount) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="识别代码"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.identifier }}</span>
        <el-input v-else v-model="applicationDetail.identifier" placeholder="请输入配件识别代码" />
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="承保公司"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.insurer }}</span>
        <el-input v-else v-model="applicationDetail.insurer" placeholder="请输入承保公司名称" />
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件', '调价申请'].indexOf(applicationDetail.type) > -1"
        label="被保险人姓名"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.insured }}</span>
        <el-input v-else v-model="applicationDetail.insured" placeholder="请输入被保险人真实姓名，例如：张三" />
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '调价申请'"
        label="出险时间"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ formatDate(applicationDetail.occurredDate) }}</span>
        <el-date-picker v-else v-model="applicationDetail.occurredDate" placeholder="请选择出险时间" />
      </el-form-item>

      <el-form-item
        v-if="['包干修复', '高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="定损员"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.investigator }}</span>
        <el-input v-else v-model="applicationDetail.investigator" placeholder="请输入定损员真实姓名，例如：张三" />
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="定损地点"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.investigateLocation }}</span>
        <el-input
          v-else
          v-model="applicationDetail.investigateLocation"
          placeholder="请输入定损地点，例如：xx定损点"
        />
      </el-form-item>

      <el-form-item label="定损时间" :class="isReadonly ? 'is-readonly' : ''">
        <span v-if="isReadonly">{{ formatDate(applicationDetail.investigateDate) }}</span>
        <el-date-picker v-else v-model="applicationDetail.investigateDate" placeholder="请选择定损时间" />
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="最终价格"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.finalAmount) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.finalAmount" placeholder="请输入最终价格（自询价格）" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.finalAmount) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="['高价值件', '总成部件'].indexOf(applicationDetail.type) > -1"
        label="自付标准"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ applicationDetail.deductible }}</span>
        <el-input v-else v-model="applicationDetail.deductible" placeholder="请输入自付标准" />
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '调价申请'"
        label="报价时间"
        :class="isReadonly ? 'is-readonly' : ''"
      >
        <span v-if="isReadonly">{{ formatDate(applicationDetail.offerDate) }}</span>
        <el-date-picker v-else v-model="applicationDetail.offerDate" placeholder="请选择报价时间" />
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '调价申请'"
        label="报价金额"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.quotedAmount) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.quotedAmount" placeholder="请输入报价金额" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.quotedAmount) }}</span>
        </div>
      </el-form-item>

      <el-form-item
        v-if="applicationDetail.type === '调价申请'"
        label="目标金额"
        :class="isReadonly ? 'is-readonly' : 'amount_input'"
      >
        <span v-if="isReadonly">{{ formatAmount(applicationDetail.targetAmount) }}</span>
        <div v-else>
          <el-input v-model="applicationDetail.targetAmount" placeholder="请输入目标金额" />
          <span style="color: darkgrey;">{{ formatAmount(applicationDetail.targetAmount) }}</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getName } from '@/api/user'
import moment from 'moment'

export default {
  props: {
    isReadonly: {
      type: Boolean,
      required: true,
      default: false
    },
    applicationDetail: {
      type: Object,
      required: true,
      default: () => {
        return {
          state: '',
          type: '',
          applicant: '',
          startDate: '',
          caseNo: '',
          plateNo: '',
          vehicleModel: '',
          repairePlant: '',
          actualCost: '',
          evaluationCost: '',
          purchasePrice: '',
          agreementAmount: '',
          investigator: '',
          investigateLocation: '',
          investigateDate: '',
          identifier: '',
          insurer: '',
          insured: '',
          finalAmount: '',
          deductible: '',
          occurredDate: '',
          offerDate: '',
          quotedAmount: '',
          targetAmount: ''
        }
      }
    }
  },
  data() {
    return {
      applicantName: ''
    }
  },
  computed: {
    formatDate() {
      return date => {
        return moment(date || moment())
          .format('YYYY 年 MM 月 DD 日')
          .toString()
      }
    },
    formatAmount() {
      return amount => {
        return Number(amount || '0.00').toLocaleString('zh', {
          minimumFractionDigits: 2
        })
      }
    }
  },
  created() {
    // 设置默认值
    this.applicationDetail.state = this.applicationDetail.state || '初审'
    this.applicationDetail.type = this.applicationDetail.type || '包干修复'
    this.applicationDetail.applicant =
      this.applicationDetail.applicant || 'nobody'
    this.applicationDetail.startDate =
      this.applicationDetail.startDate || moment()

    // 通过用户名获取用户的真实姓名
    const _this = this

    getName(this.applicationDetail.applicant)
      .then(res => {
        _this.applicantName = res.data
      })
      .catch(() => {
        _this.applicantName =
          _this.applicationDetail.applicant + '（没有找到申请人真实姓名）'
      })
  }
}
</script>

<style scoped>
.is-readonly {
  margin-bottom: 0px;
}

.amount_input {
  margin-bottom: 0px;
}
</style>
