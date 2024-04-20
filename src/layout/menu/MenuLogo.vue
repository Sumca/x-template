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
.logo {
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: rgb(243, 247, 249);
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
    color: black;
    font-size: 20px;
    line-height: 60px;
    font-family: FangSong;
  }
}
</style>
