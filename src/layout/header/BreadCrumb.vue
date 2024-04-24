<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="{ path: item.path }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbList = computed(() => {
  const matched = route.matched
  const list = matched.map((match) => {
    return {
      name: match.meta.title,
      path: match.path,
    }
  })

  return list
})
</script>

<style scoped>
.breadcrumb {
  margin: 8px 0;
}
</style>
