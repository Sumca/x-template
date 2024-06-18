<template>
  <el-table-column :prop="column.prop" :label="column.label" :width="column.width">
    <template #default="{ row, $index }">
      <div v-if="isEditable(column, row)">
        <component
          :is="getComponent(column)"
          v-model="row[column.prop]"
          v-bind="column.attrs"
          :rowData="row"
          v-on="{ ...column.linstener }"
          :column="column"
          :disabled="isDisabled(column, row)"
          @input="(value: ValProp) => onValidate(value, row, $index)"
          @change="(value: ValProp) => onValidate(value, row, $index)"
        />
        <span v-if="errorMessages[column.prop + '_' + $index]" class="error-msg">
          {{ errorMessages[column.prop + '_' + $index] }}
        </span>
      </div>
      <div v-else class="render-cell">
        <el-icon>
          <component :is="column.iconName" v-bind="{ ...column.iconAttrs }" />
        </el-icon>
        <span :style="column.fontStyle">
          {{ column.labelRender ? column.labelRender() : row[column.prop] }}
        </span>
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup name="EditTableColumn">
import { ref, reactive, markRaw, computed } from 'vue'
import { getComponentByType } from './config/factory'
import { useValidate } from './config/validate'
import type { StyleValue } from 'vue'

const emit = defineEmits(['edit'])
const props = defineProps({
  column: {
    type: Object as () => ColumnProp,
    default: () => {
      return {
        prop: '',
        label: '',
        editable: false,
        rules: [],
        type: 'input',
        component: null, // 自定义传入的组件 当都满足不了需求 那么可以放入自定义组件来渲染自定义组件
        listeners: {}, // 监听的事件名, 比如 input focus blur, 或者是组件的自定义事件
        attrs: {}, // 对el-table-column需要设置的属性, 比如 align fixed sortable 属性, 支持el-table-column属性
        cAttrs: {} // 对显示的组件需要设置的属性, 比如 placeholder type disabled 属性, 支持element表单属性
      }
    }
  }
})
// 动态匹配组件
const getComponent = (column: ColumnProp) => {
  const type = column.type
  if (column.component) return markRaw(column.component)
  return getComponentByType(type)
}
// 编辑状态
const isEditable = (column: ColumnProp, row: object): boolean => {
  if (typeof column.editable === 'function') {
    return column.editable(row)
  }
  return !!column.editable
}
//Disabled状态
const isDisabled = (column: ColumnProp, row: object): boolean => {
  if (typeof column?.attrs?.disabled === 'function') {
    return column?.attrs?.disabled(row)
  }
  return !!column?.attrs?.disabled
}
// 校验
const errorMessages = reactive({})
type ValProp = string | number | object[] | null | undefined
const onValidate = (val: ValProp, row: object, idx: number) => {
  emit('edit', { value: val, row, column: props.column })
  if (!props.column.rules) return
  const error = useValidate(val, row, props.column.rules)
  if (error) {
    errorMessages[props.column.prop + '_' + idx] = error
  } else {
    delete errorMessages[props.column.prop + '_' + idx]
  }
}
// clearValidate
const clearValidate = () => {
  for (const key in errorMessages) {
    delete errorMessages[key]
  }
}
const validate = () => {
  return new Promise((resolve, reject) => {
    for (const key in errorMessages) {
      if (errorMessages[key]) {
        const num = Number(key.split('_')[1]) + 1
        reject({ message: `${props.column.label}第${num}行:${errorMessages[key]}` })
      }
    }
    resolve({})
  })
}
defineExpose({ clearValidate, validate })
//
</script>
<style lang="scss" scoped>
.error-msg {
  color: #f00;
  font-size: 12px;
}
.render-cell {
  display: flex;
  align-items: center;
}
</style>
