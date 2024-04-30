<template>
  <el-select v-bind="$attrs" v-model="selectData" @change="handleChangeOptions">
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

<script lang="ts" setup>
import { ref, PropType, watch, useAttrs, computed } from 'vue'
import type { CheckboxValueType } from 'element-plus'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  options: Array as PropType<option[]>,
  modelValue: {
    type: [String, Number, Array],
  },
  showSelectAll: {
    type: Boolean,
    default: true,
  },
})
// const attrs = useAttrs()
// const checkAll = ref(false)
// const indeterminate = ref(false)
const selectData = ref(props.modelValue)

const checkAll = computed(() => {
  const val = selectData?.value as string | option[]
  if (val.length === props?.options?.length) return true
  return false
})
const indeterminate = computed(() => {
  const val = selectData?.value as string | option[]
  if (val.length === props?.options?.length || val.length === 0) return false
  return true
})

// watch(
//   () => selectData as string | option[],
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
const handleChangeOptions = (val: string | option[]) => {
  emit('update:modelValue', val)
}
const handleCheckAll = (val: option) => {
  // indeterminate.value = false
  const newVal = val ? props?.options?.map((_) => _.value) : []
  selectData.value = newVal
  emit('update:modelValue', newVal)
}
</script>
