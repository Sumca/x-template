<template>
  <div class="tag-view">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <template v-for="tag in tagsStore.tags" :key="tag.name">
          <el-tag
            class="tag-item"
            closable
            round
            type="primary"
            :effect="tagsStore.activedTag?.path === tag.path ? 'dark' : 'plain'"
            @close="handleClose(tag)"
            @click="handleClickTag(tag)"
            @click.right.prevent="rightClickTag(tag)"
          >
            <!-- {{ tag.title }} -->
            <Contextmenu
              :title="tag.title"
              :activedMenu="activedMenu"
              @close="handleClose(tag)"
              @closeAll="handleCloseAll"
              @refresh=""
            />
          </el-tag>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsStore } from '@/store/tags'
import Contextmenu from './Contextmenu.vue'

const tagsStore = useTagsStore()
const route = useRoute()
const router = useRouter()
//
watch(
  route,
  (newRoute) => {
    const tag = {
      name: newRoute.name as string,
      title: newRoute.meta.title as string,
      path: newRoute.path,
      // fullPath: newRoute.fullPath,
      // affix: newRoute.meta?.affix,
      // keepAlive: newRoute.meta?.keepAlive,
    }
    tagsStore.addTag(tag)
    tagsStore.setActiveTag(tag)
  },
  { immediate: true }
)
// 点击切换
const handleClickTag = (tag: tagsViewItemProp) => {
  tagsStore.setActiveTag(tag)
}
// 右键菜单
let activedMenu = ref<tagsViewItemProp>()
const rightClickTag = (tag: tagsViewItemProp) => {
  activedMenu.value = tag
}
//关闭
const handleClose = (tag: tagsViewItemProp) => {
  tagsStore.removeTags(tag)
}
// 关闭所有
const handleCloseAll = () => {
  tagsStore.removeAllTags()
}
</script>

<style lang="scss" scoped>
.tag-view {
}
.tag-item {
  margin-right: 5px;
  cursor: pointer;
}
.scrollbar-flex-content {
  display: flex;
}
</style>
