import { App } from 'vue'
import { useDebounceFn } from '@vueuse/core' // vueuse 工具集
// useDebounceFn 
// const onReset = useDebounceFn(async () => {
//   doSomething...
// }, 200)
// 防抖指令 使用：<div v-debounce:200="clickFn"> click </div>
export const debounce = (app:App<Element>)=>{
  app.directive('debounce', {
    beforeMount(el, binding) {
      // 获取指令的参数，默认为200ms
      const delay: number = Number(binding.arg) || 200
      const debouncedHandler = useDebounceFn(binding.value, delay);
      el.addEventListener('click', debouncedHandler);
      el._debouncedClick = debouncedHandler;
    },
    unmounted(el) {
      // 组件销毁时移除事件监听
      el.removeEventListener('click', el._debouncedClick);
    }
  })
}