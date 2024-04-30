import { App } from 'vue'
//buttonsFromCache 根据value判断按钮是否有权限
import { buttonsFromCache } from '@/utils/btnPermission'
export const defaultPermission = (app:App<Element>)=>{
  app.directive('permission', {
    mounted(el, binding) {
      if(!buttonsFromCache(binding.value)) {
        el.remove()
      }
    },
  })
}