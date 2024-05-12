import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useLocal = defineStore('useLocal',()=>{
  // const name = ref('xiaoming')
  // const getterName = computed(()=>{
  //   return name.value+'+computed'
  // })
  
  const setLanguage = (lang:string)=>{
    localStorage.setItem('language',lang);
  }
  const getLanguage = ()=>{
    return localStorage.getItem('language')
  }
  const clearLocalLanguage = ()=>{
    localStorage.removeItem('language')
  }
  return { setLanguage, getLanguage, clearLocalLanguage }
})