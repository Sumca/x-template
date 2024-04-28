<template>
  <div class="logo">
    <img src="@/assets/logo.webp" @click="onClick" />
    <span v-show="!collapse" class="logo-title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['toogleCollapse'])
const title = ref('后台管理系统')
const props = defineProps({
  collapse: Boolean,
})
const onClick = () => emit('toogleCollapse')
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.logo {
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: var(--theme-drak-background-color-2);
  text-align: center;
  cursor: pointer;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    margin-right: 12px;
  }
  .logo-title {
    font-weight: 800;
    color: var(--theme-drak-color);
    font-size: 20px;
    line-height: 60px;
    font-family: FangSong;
    animation: fadeIn 5s;
  }
}
</style>
