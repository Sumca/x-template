<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :width="column.label"
  />
</template>

<script lang="ts" setup name="x-table">
import { reactive, PropType } from 'vue'

const props = defineProps({
  column: {
    type: Object,
    default: () => {},
  },
})
</script>
<style></style>
