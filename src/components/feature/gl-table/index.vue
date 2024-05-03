<template>
  <el-card class="table-card" v-loading="loading">
    <!-- 头部 -->
    <template #header>
      <div class="card-header">
        <div class="title">
          <div class="main-title">{{ title }}</div>
          <div class="sub-title">总计{{ pages.total }}条</div>
        </div>
        <div class="btn-solt"><slot name="buttton" /></div>
      </div>
    </template>
    <!-- 表格 -->
    <el-table v-bind="$attrs" :data="tableData" style="width: 100%">
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column v-if="isNo" label="序号" type="index" width="70" />
      <template v-for="column in tableColumns" :key="column.prop">
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
import { reactive, ref, watchEffect } from 'vue'

const emit = defineEmits(['sizeChange', 'currentChange'])
const props = defineProps({
  title: String,
  data: Array,
  columns: {
    type: Array as () => ColumnProp[],
    default: () => [],
    coment: '表头数据',
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
    coment: '分页具体配置信息',
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
  httpRequest: {
    type: Function,
    default: null,
    coment: '请求的API',
  },
  httpRequestParams: {
    type: Object,
    default: () => {},
    coment: '请求的参数',
  },
  httpImmediate: {
    type: Boolean,
    default: false,
    coment: '请求默认加载一次',
  },
})
// 表格数据
let tableData = ref<object[]>([])
watchEffect(() => {
  tableData.value = props.data as object[]
})
// slider
let tableColumns = ref<ColumnProp[]>([])
watchEffect(() => {
  tableColumns.value = props.columns as ColumnProp[]
})
// slider column 回调
const sliderCheckedColumnsChange = (checkedArr: string[]) => {
  tableColumns.value = props.columns.filter((item) =>
    checkedArr.includes(item.prop)
  )
}

// page
const pages = reactive({
  currentPage: 1,
  pageSize: props.pageConfig.pageSizes[0],
  total: 0,
})
const handleSizeChange = (val: number) => {
  pages.pageSize = val
  searchTableData()
  emit('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  pages.currentPage = val
  emit('currentChange', val)
  searchTableData()
}
// loading
let loading = ref(false)
// 请求
const searchTableData = async () => {
  if (!props.httpRequest) return
  loading.value = true
  const params = {
    ...props.httpRequestParams,
    page: pages.currentPage,
    size: pages.pageSize,
  }
  const { data } = await props.httpRequest(params)
  tableData.value = data || []
  pages.total = data.length || 0
  loading.value = false
}
// 默认加载一次请求
if (props.httpImmediate) searchTableData()
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
      .main-title {
        font-weight: 600;
      }
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
