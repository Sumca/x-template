<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Index', 'Root', 'Home']">
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
const a = 1
</script>
