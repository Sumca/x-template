import { ref, onMounted } from 'vue'

export const useComponent = (componentRef:object, componentMethods:object)=>{
  const refMethods = Object.entries(componentRef).filter(
    ([_, value]) => value instanceof Function
  )
  refMethods.forEach(([key, value]) => {
    componentMethods[key] = value
  })
  return componentMethods
}
