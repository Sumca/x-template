<template>
  <div class="header-container">
    <BreadCrumb />
    <Avatar />
  </div>
  <!-- <div>
    <TabView />
  </div> -->
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import TabView from './TabView.vue'
import Avatar from './Avatar.vue'
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
}
</style>
