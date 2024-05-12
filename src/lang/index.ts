import { createI18n } from 'vue-i18n'
import zh from './zh/index'
import en from './en/index'

const messages = {
  en,
  zh,
}

console.log('localStorage.getItem', localStorage.getItem('language'));

const language = (navigator.language || 'en').toLocaleLowerCase() // 获取浏览器的语言
console.log('language.split', language.split('-')[0]);

const i18n = createI18n({
  locale: localStorage.getItem('language') || language.split('-')[0] || 'en', // 先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh', // 设置备用语言
  messages,
  legacy: false,
  globalInjection:true,

})

export default i18n