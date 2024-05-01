<template>
  <el-select v-bind="$attrs" v-model="selectData">
    <template #header v-if="showSelectAll && $attrs.multiple">
      <el-checkbox
        v-model="checkAll"
        :indeterminate="indeterminate"
        @change="handleCheckAll"
      >
        全部
      </el-checkbox>
    </template>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup name="GlSelect">
import { ref, PropType, computed } from 'vue'
const props = defineProps({
  options: Array as PropType<Option[]>,
  showSelectAll: {
    type: Boolean,
    default: true,
  },
})
let selectData = defineModel()

const checkAll = computed(() => {
  const val = selectData.value as string | Option[]
  if (val?.length === props?.options?.length) return true
  return false
})
const indeterminate = computed(() => {
  const val = selectData.value as string | Option[]
  if (!val) return false
  if (val.length === props?.options?.length || val.length === 0) return false
  return true
})

// watch(
//   () => selectData as string | Option[],
//   (val) => {
//     if (typeof val === 'string') return
//     if (val.length === 0) {
//       checkAll.value = false
//       indeterminate.value = false
//     } else if (val.length === props?.options?.length) {
//       checkAll.value = true
//       indeterminate.value = false
//     } else {
//       indeterminate.value = true
//     }
//   },
//   { immediate: true }
// )

const handleCheckAll = (val: Option) => {
  // indeterminate.value = false
  const newVal = val ? props?.options?.map((_) => _.value) : []
  selectData.value = newVal
}
</script>
