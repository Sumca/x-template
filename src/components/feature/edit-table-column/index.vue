<template>
  <el-table-column :prop="column.prop" :label="column.label" :width="column.width">
    <template v-if="column.editable" #default="{ row, $index }">
      <component
        :is="getComponent(column)"
        v-model="row[column.prop]"
        v-bind="column.attrs"
        v-on="{ ...column.linstener }"
        :column="column"
        @input="(value: ValProp) => onValidate(value, row, $index)"
        @change="(value: ValProp) => onValidate(value, row, $index)"
      />
      <span v-if="errorMessages[column.prop + $index]" class="error-msg">
        {{ errorMessages[column.prop + $index] }}
      </span>
    </template>
    <template v-else #default="{ row }">
      <div>
        {{ column.labelRender ? column.labelRender() : row[column.prop] }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup name="EditTableColumn">
import { ref, reactive, PropType, computed } from 'vue'
import { getComponentByType } from './config/factory'
import { useValidate } from './config/validate'

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
  return column.component || getComponentByType(type)
}
// 校验
const errorMessages = reactive({})
type ValProp = string | number | object[] | null | undefined
const onValidate = (val: ValProp, row: object, idx: number) => {
  emit('edit', { value: val, row, column: props.column })
  if (!props.column.rules) return
  const error = useValidate(val, row, props.column.rules)
  errorMessages[props.column.prop + idx] = error
}
// clearValidate
const clearValidate = () => {
  for (const key in errorMessages) {
    delete errorMessages[key]
  }
}
defineExpose({ clearValidate })
//
</script>
<style lang="scss" scoped>
.error-msg {
  color: #f00;
  font-size: 12px;
}
</style>
