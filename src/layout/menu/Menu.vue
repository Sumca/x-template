<template>
  <div>
    <menu-logo
      :collapse="isCollapse"
      @toogleCollapse="toogleCollapse"
    ></menu-logo>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :unique-opened="uniqueOpenedFlag"
      :collapse="isCollapse"
      router
    >
      <!-- 在为el-menu设置unique-opened属性时必须要确保el-sub-menu、el-menu-item中index的唯一性，如果index不唯一则不生效 -->
      <!-- 本组件作为父组件向子组件传递数据menuList，子组件需要定义menuList属性以确保可以接受该数据 -->
      <menu-item :menuList="menuList"></menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import MenuItem from '@/layout/menu/MenuItem.vue'
import MenuLogo from '@/layout/menu/MenuLogo.vue'
import { useRouter, useRoute } from 'vue-router'
const emit = defineEmits(['toogleCollapse'])

let isCollapse = ref(false)
const uniqueOpenedFlag = ref(true)

// 获取当前点击的路由
const route = useRoute()
const router = useRouter()

const menuList = router.options.routes

// 从路由中获取path
const activeIndex = computed(() => {
  const { path } = route
  return path
})
const toogleCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('toogleCollapse')
}
</script>

<style lang="scss" scoped></style>
