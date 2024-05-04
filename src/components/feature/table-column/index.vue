<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
  >
    <template #default="{ row }">
      <!-- 自定义渲染组件 -->
      <component
        v-if="column.component"
        :row="row"
        :is="column.component"
        v-bind="column.attrs"
      />
      <div v-else v-html="render(column, row)"></div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup name="TableItem">
import { ref, reactive, PropType, computed } from 'vue'

const props = defineProps({
  column: {
    type: Object as () => ColumnProp,
    default: () => {
      return {
        prop: '',
        label: '',
      }
    },
  },
})
const render = (column: ColumnProp, row: object) => {
  if (column.labelRender) {
    const labelRender = column.labelRender as Function
    return labelRender(row[column.prop], row)
  }
  return row[column.prop]
}
</script>
<style></style>
