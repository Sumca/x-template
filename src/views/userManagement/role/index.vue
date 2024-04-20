<template>
  <div>
    <div>page: {{ title }}</div>
    <div>store name: {{ users.name }}</div>
    <div>store getterName: {{ users.getterName }}</div>
  </div>
</template>

<script lang="ts" setup>
// import { ref, reactive } from 'vue'
import { user } from '@/store/user'
const users = user()

const title = '角色管理'
</script>
