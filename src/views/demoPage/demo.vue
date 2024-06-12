<template>
  <div>
    <!-- 表单 -->
    <div>
      <gl-form
        title="查询条件"
        v-model="formData"
        :form-items="formItems"
        @submit="onSubmit"
        @reset="onReset"
      ></gl-form>
    </div>
    <!-- 表格 -->
    <div style="margin-top: 10px">
      <edit-table
        ref="editTable"
        title="数据表格"
        max-height="300"
        showSlider
        :is-selection="true"
        :columns="columns"
        :data="tableData"
      >
        <template #buttton>
          <!-- 权限按钮 -->
          <el-button type="success" v-permission="'Demo1.add'" @click="onAdd">新增</el-button>
          <el-button type="info" @click="onSave">保存</el-button>
          <el-button type="danger" v-permission="'Demo1.delete'" v-debounce="onDelete">删除</el-button>
        </template>
        <!-- 操作列 原el-table 插槽 -->
        <el-table-column fixed="right" label="操作" width="120">
          <template #header>
            <el-input size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button link type="primary" size="small">{{ scope.row.name }}</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
        <!-- <template #empty>无数据啊</template> -->
      </edit-table>
    </div>
  </div>
</template>

<script lang="ts" setup name="Demo1">
import { ref, reactive } from 'vue'
import GlForm from '@feature/gl-form/index.vue'
import DataDict from '@bussiness/DataDict/index.vue'
import EditTable from '@feature/edit-table/index.vue'
import { getTableDataApi } from '@/api/common'
import { useDebounceFn } from '@vueuse/core' // vueuse 工具集
import { ElMessage } from 'element-plus'
// form 配置
const formData = ref<object>({
  name: '222',
  classfly1: ['a'],
  gender: 'man'
})
const formItems: ItemProp[] = [
  { type: 'input', label: '名字', prop: 'name', span: 6 },
  {
    label: '性别',
    prop: 'gender',
    component: DataDict,
    span: 6,
    attrs: {
      placeholder: '请选择性别',
      clearable: true,
      url: '/mock/getSelectData'
      // options: [
      //   { label: '男', value: 'man' },
      //   { label: '女', value: 'feman' }
      // ]
    },
    linstener: {
      change(val: any) {
        console.log('性别: ', val)
      }
    }
  },
  {
    type: 'select',
    label: '类别',
    prop: 'classfly1',
    span: 6,
    attrs: {
      placeholder: '请选择类别',
      clearable: true,
      multiple: true,
      collapseTags: true,
      options: [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
        { label: 'c', value: 'c' }
      ]
    },
    linstener: {
      change(val: any) {
        console.log('类别: ', val)
      }
    }
  },
  {
    type: 'dateYMD',
    label: '日期',
    prop: 'date',
    span: 6,
    attrs: { placeholder: '选择日期1' }
  },
  {
    type: 'input',
    label: '地址',
    prop: 'adress',
    span: 6,
    attrs: { type: 'textarea' }
  },
  { type: 'input', label: '电话', prop: 'phone', span: 6 }
]
// 查询
let tableData = ref<object[]>([])
const onSubmit = async () => {
  const params = { ...formData.value, pagenum: 1, pagesize: 22 }
  const { data } = (await getTableDataApi(params)) as any
  tableData.value = data
}
// 清空
const onReset = useDebounceFn(async () => {
  formData.value = {}
}, 200)
// 表格列配置
const columns: ColumnProp[] = [
  {
    label: '姓名',
    iconName: 'Edit',
    iconAttrs: { color: '#f534B1' },
    fontStyle: { padding: '0 4px' },
    prop: 'name',
    width: '100'
  },
  {
    label: '数量',
    prop: 'count',
    type: 'number',
    editable: true,
    attrs: { max: 10, min: 1 },
    width: '160'
  },
  {
    type: 'switch',
    label: '状态',
    prop: 'status',
    editable: true,
    attrs: {
      activeValue: '1',
      inactiveValue: '0'
    },
    width: '100'
  },
  {
    label: '年龄',
    prop: 'age',
    width: '100',
    editable: true,
    rules: [
      { required: true, message: '年龄不能为空' },
      { pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/, message: '年龄只能是正整数或者最多两位小数的数字' }
    ],
    attrs: { maxlength: 4 },
    linstener: {
      change(val: string) {
        console.log(val)
      }
    }
  },
  {
    label: '邮箱',
    prop: 'email',
    editable: true,
    width: '200',
    attrs: { disabled: true }
  },
  {
    label: '性别',
    prop: 'gender',
    editable: true,
    type: 'select',
    width: '100',
    rules: [{ required: true, message: '性别不能为空' }],
    attrs: {
      clearable: true,
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' }
      ]
    },
    linstener: {
      change(val: string) {
        console.log(val)
      }
    }
  },
  {
    label: '日期',
    prop: 'date',
    type: 'date',
    editable: true,
    width: '280',
    attrs: {
      valueFormat: 'YYYY-MM-DD'
    }
  },
  { label: '地址', prop: 'address', width: '280' }
]
const editTable = ref()
// 编辑时触发
const onRowEdit = (value: object) => {
  console.log(value)
}
// 新增
const onAdd = () => {
  tableData.value.unshift({})
  editTable.value.clearValidate()
}
// 保存
const onSave = () => {
  editTable.value
    .validate()
    .then(() => {
      ElMessage.success('校验通过,发送请求')
    })
    .catch((err: any) => {
      ElMessage.error('校验不通过,' + err?.message)
    })
}
// 删除
const onDelete = () => {
  console.log('getSelectionRows: ', editTable.value.getSelectionRows())
}
</script>
