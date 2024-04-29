<template>
  <div>
    <!-- 表单 -->
    <div>
      <x-form
        title="查询条件"
        v-model="formData"
        :formItems="formItems"
        @submit="onSubmit"
        @reset="onReset"
      ></x-form>
    </div>
    <div>
      <el-button v-permission="'add'">add</el-button>
      <el-button v-permission="'edit'">edit</el-button>
      <el-button v-permission="'delete'">delete</el-button>
    </div>
    <!-- 表格 -->
    <div style="margin-top: 10px">
      <xTable
        title="数据表格"
        max-height="300"
        showSlider
        :columns="columns"
        :data="tableData"
      ></xTable>
    </div>
  </div>
</template>

<script lang="ts" setup name="Demo1">
import { ref, reactive } from 'vue'
import xForm from '@feature/x-form/index.vue'
import xSelect from '@feature/x-select/index.vue'
import xTable from '@feature/x-table/index.vue'
import { getTableDataApi } from '@/api/common'
import { useDebounceFn } from '@vueuse/core' // vueuse 工具集
const formData = {
  name: 'sss',
  gender: 'feman',
  classfly1: ['a', 'c'],
}
const formItems: itemProp[] = [
  { type: 'input', label: '名字', prop: 'name', span: 6 },
  {
    component: xSelect,
    label: '性别',
    prop: 'gender',
    attrs: {
      placeholder: '请选择性别',
      clearable: true,
      span: 6,
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
    },
    linstener: {
      change(val: any) {
        console.log('性别: ', val)
      },
    },
  },
  {
    component: xSelect,
    label: '类别',
    prop: 'classfly1',
    attrs: {
      placeholder: '请选择类别',
      clearable: true,
      multiple: true,
      collapseTags: true,
      span: 6,
      options: [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
        { label: 'c', value: 'c' },
      ],
    },
    linstener: {
      // change(val: any) {
      //   console.log('类别: ', val)
      // },
    },
  },
  {
    type: 'input',
    label: '地址',
    prop: 'adress',
    span: 12,
    attrs: { type: 'textarea' },
  },
  { type: 'input', label: '电话', prop: 'phone', span: 6 },
]
// 查询
let tableData = ref([])
const onSubmit = async () => {
  const params = { ...formData, pagenum: 1, pagesize: 22 }
  const { data } = (await getTableDataApi(params)) as any
  tableData.value = data
}
//
const onReset = useDebounceFn(async () => {
  console.log('onReset')
}, 200)

const columns: columnProp[] = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '日期', prop: 'date' },
  { label: '地址', prop: 'address' },
]
//
</script>
