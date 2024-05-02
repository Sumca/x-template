<template>
  <el-container class="container">
    <!-- layout布局左侧菜单区 -->
    <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">
      <!-- 菜单项，通过组件的形式引入 -->
      <Menu @toogle-collapse="toogleCollapse"></Menu>
    </el-aside>
    <!-- layout布局内容区 -->
    <el-container>
      <!-- 内容区头部 -->
      <el-header class="header">
        <!-- 头部组件，抽离成组件形式 -->
        <Header></Header>
      </el-header>
      <!-- 内容区的主体，用于数据展示 -->
      <el-main class="content">
        <!-- <router-view></router-view> -->
        <router-view
          v-slot="{ Component, route }"
          v-if="tagsStore.refreshTagStatus"
        >
          <keep-alive>
            <component
              v-if="route.meta.keepAlive"
              :is="Component"
              :key="route.name"
            />
          </keep-alive>
          <component
            v-if="!route.meta.keepAlive"
            :is="Component"
            :key="route.name"
          />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts" name="layout">
// vue3中组件引入后不需要使用conponents注册，可以直接使用
import Header from '@/layout/header/Header.vue'
import Menu from '@/layout/menu/Menu.vue'
import { ref } from 'vue'
import { useTagsStore } from '@/store/tags'

const tagsStore = useTagsStore()

let isCollapse = ref(false)
const toogleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .aside {
    height: 100%;
    background-color: var(--theme-drak-background-color);
    transition: width 0.5s;
  }
  .header {
    background-color: var(--theme-drak-background-color);
    padding: 0 12px;
  }
  .content {
    background-color: var(--theme-drak-background-color-2);
    padding: 12px;
  }
}
</style>
