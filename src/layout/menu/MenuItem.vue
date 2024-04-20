<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 判断该菜单项是否有子菜单 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <!-- 通过动态组件展示图标，因为图标数据一般是通过后端查数据库拿到的 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归调用，将子菜单传递给组件处理 -->
      <menu-item :menuList="item.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else-if="item.name" :index="item.path">
      <el-icon>
        <!-- 通过动态组件展示图标 -->
        <component :is="item.meta?.icon"></component>
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

// 子组件接受父组件传递的数据
// 本组件为子组件，接受父组件传过来的数据，此处定义menuList属性，接受父组件传递的menuList数据
defineProps(['menuList'])
</script>

<style lang="scss" scoped></style>
