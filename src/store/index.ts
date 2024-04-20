import { defineStore } from 'pinia'

export const layoutStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'layoutStore',
  // state: 返回对象的函数
  state: () => ({
    a: 2
  }),
  // getter
  // getter: {
  //   c(state) {
  //     return state.count ** 2
  //   },
  // },
  
  // 操作的方法
  actions: {
    b() {}
  }
})


