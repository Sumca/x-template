import { ElInput,ElInputNumber,ElSwitch, ElDatePicker } from 'element-plus'
import SelectColumn from '@/components/feature/gl-select/index.vue'

const componentMap = {
  input: ElInput,
  number: ElInputNumber,
  switch: ElSwitch,
  select: SelectColumn,
  date: ElDatePicker,
}

export function getComponentByType(type:string|undefined) {
  if(type) return componentMap[type]
  return ElInput
}
