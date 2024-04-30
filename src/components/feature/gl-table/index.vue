<template>
  <el-card class="table-card">
    <!-- 头部 -->
    <template #header>
      <div class="card-header">
        <div class="title">{{ title }}</div>
        <div class="btn-solt"><slot name="buttton" /></div>
      </div>
    </template>
    <!-- 表格 -->
    <el-table v-bind="$attrs" :data="data" style="width: 100%">
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column v-if="isNo" label="序号" type="index" width="70" />
      <template v-for="column in tableMsg.tableColumns" :key="column.prop">
        <table-column :column="column"></table-column>
      </template>
      <slot></slot>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-content">
      <el-pagination
        v-if="showPagination"
        v-model:current-page="pages.currentPage"
        v-model:page-size="pages.pageSize"
        v-bind="pageConfig"
        :total="pages.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 列操作侧边栏 -->
    <slider
      v-if="showSlider"
      :columns="columns"
      @checkedColumnsChange="sliderCheckedColumnsChange"
    ></slider>
  </el-card>
</template>

<script lang="ts" setup name="Table">
import TableColumn from '@feature/table-column/index.vue'
import Slider from './slider/index.vue'

import { reactive, ref, useAttrs } from 'vue'
const props = defineProps({
  title: String,
  data: Array,
  columns: {
    type: Array as () => columnProp[],
    default: () => [],
  },
  showPagination: {
    type: Boolean,
    default: true,
    coment: '是否展示分页',
  },
  pageConfig: {
    type: Object,
    default: () => {
      return {
        pageSizes: [100, 200, 300, 400],
        small: true,
        disabled: false,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
      }
    },
    coment: '是否展示分页',
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
// slider
let tableMsg = reactive({ tableColumns: props.columns })
// let tableColumns = ref<columnProp[]>(props.columns)
// slider column 回调
const sliderCheckedColumnsChange = (checkedArr: string[]) => {
  tableMsg.tableColumns = props.columns.filter((item) =>
    checkedArr.includes(item.prop)
  )
}
const currentPage = ref(1)
const pageSize = ref(100)
// page
const pages = reactive({
  currentPage: 4,
  pageSize: 100,
  total: 204,
})
const handleSizeChange = (val: number) => {
  console.log('val: ', val)
}
const handleCurrentChange = (val: number) => {
  console.log('val: ', val)
}
</script>
<style lang="scss" scoped>
.table-card {
  max-width: 100%;
  position: relative;
  .card-header {
    display: flex;
    justify-content: space-between;
    .title {
      text-align: left;
      font-weight: 600;
    }
    .btn-solt {
      padding: 0 6px;
    }
  }
  .pagination-content {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;
  }
}
</style>
