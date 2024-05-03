<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.label"
  >
    <template #default="{ row }">
      <div>
        {{
          column.labelRender
            ? column.labelRender(row[column.prop], row)
            : row[column.prop]
        }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup name="TableItem">
import { ref, reactive, PropType, computed } from 'vue'

const props = defineProps({
  column: {
    type: Object,
    default: () => {
      return {
        prop: '',
        label: '',
      }
    },
  },
})
</script>
<style></style>
