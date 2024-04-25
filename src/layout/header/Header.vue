<template>
  <div class="header-container">
    <div class="header-views">
      <BreadCrumb />
      <TagView />
    </div>
    <div class="avatar-container">
      <ThemeControl />
      <Avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import TagView from './TagView.vue'
import Avatar from './Avatar.vue'
import ThemeControl from './ThemeControl.vue'
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  .header-views {
    width: 100%;
    overflow: hidden;
  }
  .avatar-container {
    display: flex;
    align-items: center;
  }
}
</style>
