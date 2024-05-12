<template>
  <div>
    <gl-table
      id="table"
      title="数据表格"
      max-height="300"
      showSlider
      :columns="columns"
      :http-request="getTableDataApi"
      :http-request-params="{ name: 'name', age: 'age' }"
      http-immediate
    >
      <template #buttton>
        <el-button v-permission="'Table.export'" @click="onExport">{{
          $t('common.export')
        }}</el-button>
      </template>
    </gl-table>
  </div>
</template>

<script lang="ts" setup name="Table">
// import { ref, reactive } from 'vue'
import GlTable from '@feature/gl-table/index.vue'
import { getTableDataApi } from '@/api/common'
import { useDownloadExcel } from '@/hooks/useDownloadXlsx' // vueuse 工具集

const onExport = () => {
  useDownloadExcel('table', '测试表格名')
}

// 表头数据
const columns: ColumnProp[] = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  {
    label: '性别',
    prop: 'gender',
    labelRender: (val: string) => {
      return val === 'man' ? '男' : val === 'feman' ? '女' : ''
    },
  },
  {
    label: '状态',
    prop: 'status',
    labelRender: (val: string) => {
      return `<h3>状态</h3>`
    },
  },
  { label: '日期', prop: 'date' },
  { label: '地址', prop: 'address' },
]
//
</script>
