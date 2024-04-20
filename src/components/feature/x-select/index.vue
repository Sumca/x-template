<template>
  <el-select v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const props = defineProps({
  options: Array as PropType<option[]>,
})
</script>
