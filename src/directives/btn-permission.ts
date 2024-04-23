import { App } from 'vue'
const btns = ['add','delete'] // 按钮权限集
export const defaultPermission = (app:App<Element>)=>{
  app.directive('permission', {
    mounted(el, binding) {
      if(!btns.includes(binding.value)) {
        el.remove()
      }
    },
  })
}