<template>
  <el-select v-bind="$attrs" :value-key="idFiled" v-model="selectData" @change="onChange">
    <template #header v-if="showSelectAll && $attrs.multiple">
      <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">全部</el-checkbox>
    </template>
    <el-option
      v-for="item in options"
      :key="item[valueFiled]"
      :label="getItemLabel(item)"
      :value="getItemValue(item)"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup name="GlSelect">
import { ref, PropType, watch } from 'vue'
type ValueTypeProp = 'string' | 'object'
type LabelFieldType = string | ((val: Option) => string)

const emit = defineEmits(['change'])
const props = defineProps({
  options: Array as PropType<Option[]>,
  labelFiled: {
    type: [String, Function] as PropType<LabelFieldType>,
    default: 'label',
    coment: '选项显示的键名'
  },
  valueFiled: {
    type: String,
    default: 'value',
    coment: '选项绑定值的键名'
  },
  idFiled: {
    type: String,
    default: 'id',
    coment: '选项绑定对象时需要指定value-key'
  },
  valueType: {
    type: String as PropType<ValueTypeProp>,
    default: 'string',
    coment: '返回值的对象类型：string/object'
  },
  showSelectAll: {
    type: Boolean,
    default: true
  }
})
let selectData = defineModel()

// const checkAll = computed(() => {
//   const val = selectData.value as string | Option[]
//   if (val?.length === props?.options?.length) return true
//   return false
// })
// const indeterminate = computed(() => {
//   const val = selectData.value as string | Option[]
//   if (!val) return false
//   if (val.length === props?.options?.length || val.length === 0) return false
//   return true
// })
let checkAll = ref(false)
let indeterminate = ref(false)

watch(
  () => selectData.value as string | Option[],
  (val) => {
    if (!val || typeof val === 'string') return
    if (val.length === 0) {
      checkAll.value = false
      indeterminate.value = false
    } else if (val.length === props?.options?.length) {
      checkAll.value = true
      indeterminate.value = false
    } else {
      indeterminate.value = true
    }
  },
  { immediate: true }
)
const onChange = (val: string | Option[]) => {
  emit('change', val)
}
// 获取value绑定的值（value或者object）
const getItemValue = (option: Option) => {
  if (props.valueType === 'object') return option
  return option[props.valueFiled]
}
//
const getItemLabel = (option: Option): string => {
  if (typeof props.labelFiled === 'function') {
    return props.labelFiled(option)
  }
  return option[props.labelFiled]
}
const handleCheckAll = (val: Option) => {
  const newVal = val
    ? props?.options?.map((option) => (props.valueType === 'object' ? option : option[props.valueFiled]))
    : []
  selectData.value = newVal
  emit('change', newVal)
}
</script>
