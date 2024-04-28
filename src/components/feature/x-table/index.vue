<template>
  <el-card class="table-card">
    <template #header>
      <div class="card-header">
        <div class="title">{{ title }}</div>
      </div>
    </template>
    <el-table v-bind="$attrs" :data="data" style="width: 100%">
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column v-if="isNo" label="序号" type="index" width="70" />
      <template v-for="column in tableMsg.tableColumns" :key="column.prop">
        <table-item :column="column"></table-item>
      </template>
      <slot></slot>
    </el-table>
    <slider
      v-if="showSlider"
      :columns="columns"
      @checkedColumnsChange="sliderCheckedColumnsChange"
    ></slider>
  </el-card>
</template>

<script lang="ts" setup name="Table">
import tableItem from '@feature/x-table-item/index.vue'
import slider from './slider/index.vue'

import { reactive, ref } from 'vue'

const props = defineProps({
  title: String,
  data: Array,
  columns: {
    type: Array as () => columnProp[],
    default: () => [],
  },
  isNo: {
    type: Boolean,
    default: true,
    coment: '是否展示序号',
  },
  isSelection: {
    type: Boolean,
    default: false,
    coment: '是否展示行的复选框',
  },
  showSlider: {
    type: Boolean,
    default: false,
    coment: '是否展示Slider',
  },
})
let tableMsg = reactive({ tableColumns: props.columns })
// let tableColumns = ref<columnProp[]>(props.columns)

// slider column 回调
const sliderCheckedColumnsChange = (checkedArr: string[]) => {
  tableMsg.tableColumns = props.columns.filter((item) =>
    checkedArr.includes(item.prop)
  )
}
</script>
<style lang="scss" scoped>
.table-card {
  max-width: 100%;
  position: relative;
  .title {
    text-align: left;
    font-weight: 600;
  }
}
</style>
