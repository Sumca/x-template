<template>
  <div class="locale-container">
    <el-dropdown @command="handleCommand">
      <el-icon><Tools /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">简体中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="ThemeControl">
import { ref, watch } from 'vue'
import { Tools } from '@element-plus/icons-vue'
import { useLocal } from '@/store/local'
import { useI18n } from 'vue-i18n'
const local = useLocal()
const { locale } = useI18n()
//
const handleCommand = (command: string) => {
  local.setLanguage(command)
  locale.value = command
}
</script>

<style lang="scss" scoped>
.locale-container {
  margin: 0 10px;
}
</style>
