<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.label"
  >
    <template v-if="column.editable" #default="{ row }">
      <component
        :is="getComponent(column)"
        v-model="row[column.prop]"
        v-bind="column.attrs"
        :column="column"
      />
    </template>
    <template v-else #default="{ row }">
      <div>
        {{ column.labelRender ? column.labelRender() : row[column.prop] }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup name="TableItem">
import { ref, reactive, PropType, computed } from 'vue'
import { getComponentByType } from './config/factory'

const props = defineProps({
  column: {
    type: Object as () => columnProp,
    default: () => {
      return {
        prop: '',
        label: '',
        editable: false,
        validate: [{ required: true, message: '不能为空' }],
        type: 'input',
        component: null, // 自定义传入的组件 当都满足不了需求 那么可以放入自定义组件来渲染自定义组件
        listeners: {}, // 监听的事件名, 比如 input focus blur, 或者是组件的自定义事件
        attrs: {}, // 对el-table-column需要设置的属性, 比如 align fixed sortable 属性, 支持el-table-column属性
        cAttrs: {}, // 对显示的组件需要设置的属性, 比如 placeholder type disabled 属性, 支持element表单属性
      }
    },
  },
})

//
const getComponent = (column: columnProp) => {
  const type = column.type
  return getComponentByType(type)
}
</script>
<style></style>
