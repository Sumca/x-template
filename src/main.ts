import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'; //引入vue-router
import { createPinia } from 'pinia'; //引入pinia
import '@/style/reset.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import './index.css'
import '@/style/reset_element.css'
import '@/style/theme.css'

import { useAllBtnPermission } from './directives'

const app = createApp(App);
// 引入element+ 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
useAllBtnPermission(app)


app.use(createPinia())
app.use(router); // 挂载到app上


app.use(ElementPlus)


app.mount('#app');
