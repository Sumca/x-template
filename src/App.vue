<template>
  <!-- keep-alive 的需要layout中处理 -->
  <el-config-provider :locale="messages[locale]">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup name="App">
import { useI18n } from 'vue-i18n'
const { locale, messages } = useI18n()
</script>
