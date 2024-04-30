import { ElInput } from 'element-plus'


// 添加Input类型
import SelectColumn from '@/components/feature/gl-select/index.vue'
// import NumberInputColumn from './components/NumberInputColumn'
// import SwitchColumn from './components/SwitchColumn'
const componentMap = {
  input: ElInput,
  // number: NumberInputColumn,
  // switch: SwitchColumn,
  select: SelectColumn
}
// export function addComponentType(type, component) {
//   componentMap[type] = component
// }

export function getComponentByType(type:string|undefined) {
  if(type) return componentMap[type] 
  return ElInput
}
