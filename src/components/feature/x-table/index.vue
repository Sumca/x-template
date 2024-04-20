<template>
  <el-card style="max-width: 100%">
    <template #header>
      <div class="card-header">
        <div class="title">{{ title }}</div>
      </div>
    </template>
    <el-table v-bind="$attrs" :data="data" style="width: 100%">
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column v-if="isNo" label="序号" type="index" width="70" />
      <template v-for="column in columns" :key="column.prop">
        <table-item :column="column"></table-item>
      </template>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup name="x-table">
import tableItem from '@feature/x-table-item/index.vue'

import { reactive, PropType } from 'vue'

const props = defineProps({
  title: String,
  data: Array,
  columns: {
    type: Array,
    default: () => [],
  },
  isNo: {
    type: Boolean,
    default: true,
  },
  isSelection: {
    type: Boolean,
    default: false,
  },
})
</script>
<style>
.title {
  text-align: left;
  font-weight: 600;
}
</style>
