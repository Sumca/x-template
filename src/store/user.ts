import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const user = defineStore('user',()=>{
  const name = ref('xiaoming')
  // const token = ref()
  const getterName = computed(()=>{
    return name.value+'+computed'
  })
  // const setToken = ()=>{
  //   name.value = 'change'+name.value
  //   localStorage.getItem('token');
  // }
  const setToken = (token:string)=>{
    localStorage.setItem('token',token);
  }
  const getToken = ()=>{
    return localStorage.getItem('token') // token 存储在 localStorage 中
  }
  const clearToken = ()=>{
    localStorage.removeItem('token')
  }
  return { name, getterName, setToken, getToken, clearToken }
})