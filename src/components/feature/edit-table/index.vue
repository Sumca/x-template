<template>
  <el-card class="table-card">
    <template #header>
      <div class="card-header">
        <div class="title">{{ title }}</div>
        <div class="btn-solt"><slot name="buttton" /></div>
      </div>
    </template>
    <el-table ref="table" v-bind="$attrs" :data="data" style="width: 100%">
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column v-if="isNo" label="序号" type="index" width="70" />
      <template v-for="column in tableMsg.tableColumns" :key="column.prop">
        <edit-table-column ref="editTableColumns" :column="column" @edit="onRowEdit"></edit-table-column>
      </template>

      <slot></slot>
      <template #empty>
        <slot name="empty"></slot>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>

      <!-- <template v-for="(value, name) in $slots">
      </template> -->
    </el-table>
    <slider v-if="showSlider" :columns="columns" @checkedColumnsChange="sliderCheckedColumnsChange"></slider>
  </el-card>
</template>

<script lang="ts" setup name="EditTable">
import EditTableColumn from '@feature/edit-table-column/index.vue'
import Slider from './slider/index.vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { ElTable } from 'element-plus'
// import { useComponent } from '@/hooks/useComponentMethods'
const emit = defineEmits(['row-edit'])
const props = defineProps({
  title: String,
  data: Array,
  columns: {
    type: Array as () => ColumnProp[],
    default: () => []
  },
  isNo: {
    type: Boolean,
    default: true,
    coment: '是否展示序号'
  },
  isSelection: {
    type: Boolean,
    default: false,
    coment: '是否展示行的复选框'
  },
  showSlider: {
    type: Boolean,
    default: false,
    coment: '是否展示Slider'
  }
})
let tableMsg = reactive({ tableColumns: props.columns })
// let tableColumns = ref<ColumnProp[]>(props.columns)

// slider column 回调
const sliderCheckedColumnsChange = (checkedArr: string[]) => {
  tableMsg.tableColumns = props.columns.filter((item) => checkedArr.includes(item.prop))
}
// 获取到el-table的方法，然后 defineExpose 将el-table的方法暴露出去
const elTableMethods = ref({})
const table = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  const refMethods = Object.entries(table.value as object).filter(([_, value]) => value instanceof Function)
  refMethods.forEach(([key, value]) => {
    elTableMethods.value[key] = value
  })
})
const editTableColumns = ref()
// clearValidate
const clearValidate = () => {
  editTableColumns?.value?.forEach((item: any) => {
    item?.clearValidate()
  })
}
elTableMethods.value['clearValidate'] = clearValidate
// 查询清空校验
watch(
  () => props.data,
  () => clearValidate()
)
//
const onRowEdit = (val: object) => {
  emit('row-edit', val)
}

defineExpose(elTableMethods.value)
</script>
<style lang="scss" scoped>
.table-card {
  max-width: 100%;
  position: relative;
  .title {
    text-align: left;
    font-weight: 600;
  }
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
}
</style>
