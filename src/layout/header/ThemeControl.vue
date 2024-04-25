<template>
  <div class="theme-btn">
    <el-switch
      v-model="theme"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
      @change="themeChange"
    />
  </div>
</template>

<script setup lang="ts" name="ThemeControl">
import { ref, watch } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
const theme = ref(false)
//系统主题
const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
theme.value = mediaQueryList.matches // 和系统主题同步

watch(
  theme,
  () => {
    const className = theme.value ? '--theme__drak' : ''
    document!.querySelector('html')!.className = className
  },
  { immediate: true }
)
//切换主题 存本地
const themeChange = () => {}
</script>

<style lang="scss" scoped>
.theme-btn {
  margin: 0 6px;
}
</style>
