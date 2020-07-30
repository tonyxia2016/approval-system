<template>
  <div>
    <el-select v-model="leader" style="width: 100%" placeholder="请选择待移交的组长">
      <el-option
        v-for="item in leaderList"
        :key="item.username"
        :label="item.name"
        :value="item.username"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    leaderList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      leader: ''
    }
  }
}
</script>
