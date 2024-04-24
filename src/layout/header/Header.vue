<template>
  <div class="header-container">
    <div class="header-views">
      <BreadCrumb />
      <TagView />
    </div>
    <div class="avatar-container">
      <Avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import TagView from './TagView.vue'
import Avatar from './Avatar.vue'
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
    justify-content: center;
    align-items: center;
  }
}
</style>
