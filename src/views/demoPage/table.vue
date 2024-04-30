<template>
  <div>
    <gl-table
      title="数据表格"
      max-height="300"
      showSlider
      :columns="columns"
      :data="tableData"
    >
      <template #buttton>
        <el-button>导出</el-button>
      </template>
    </gl-table>
  </div>
</template>

<script lang="ts" setup name="Demo1">
import { ref, reactive } from 'vue'
import GlTable from '@feature/gl-table/index.vue'
import { getTableDataApi } from '@/api/common'
import { useDebounceFn } from '@vueuse/core' // vueuse 工具集

// 查询
let tableData = ref([])
const onSearch = async () => {
  const params = { pagenum: 1, pagesize: 22 }
  const { data } = (await getTableDataApi(params)) as any
  tableData.value = data
}
onSearch()

//
const columns: columnProp[] = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  {
    label: '性别',
    prop: 'gender',
  },
  { label: '日期', prop: 'date' },
  { label: '地址', prop: 'address' },
]
//
</script>
