<template>
  <el-dropdown ref="dropdown" trigger="contextmenu">
    <span>
      {{ title }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onRefresh">刷新</el-dropdown-item>
        <el-dropdown-item @click="onClose">关闭</el-dropdown-item>
        <el-dropdown-item @click="onCloseAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Contextmenu">
import { useProps } from 'element-plus/es/components/select-v2/src/useProps'
import { watchEffect, watch } from 'vue'
import { ref } from 'vue'
import type { DropdownInstance } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    requre: false,
  },
  activedMenu: {
    type: Object,
    requre: true,
  },
})
const emit = defineEmits(['refresh', 'close', 'closeAll'])
const onRefresh = () => {
  emit('refresh')
}
const onClose = () => {
  emit('close')
}
const onCloseAll = () => {
  emit('closeAll')
}

const dropdown = ref<DropdownInstance>()
watch(
  () => props.activedMenu,
  (val) => {
    if (props.title === val?.title) {
      dropdown?.value?.handleOpen()
    } else {
      dropdown?.value?.handleClose()
    }
  }
)
</script>

<style lang="scss" scoped></style>
