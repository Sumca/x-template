<template>
  <div class="flex">
    <el-tag
      class="tag-item"
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
// import { useTabsStore } from '@/stores/tabs'; // 引入标签页状态管理器

const route = useRoute()
const router = useRouter()
// console.log('router: ', router)

// console.log('route: ', route)
interface tabProp {
  name: string
  label: string
  type?: string
}
const tags: tabProp[] = [
  { label: 'sss', name: '菜单1', type: 'success' },
  { label: 'gfff', name: '菜单2', type: 'success' },
]
const handleClose = (tag: tabProp) => {
  console.log('tag: ', tag)
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.tag-item {
  margin-right: 5px;
}
</style>
