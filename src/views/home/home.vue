<template>
  <div>
    <Axes />
    <Line />
  </div>
</template>

<script lang="ts" setup name="Home">
import Axes from './three/axes.vue'
import Line from './three/line.vue'

import { ref, reactive, PropType, onActivated, onMounted } from 'vue'

onMounted(() => {
  console.log('onMounted')
})
onActivated(() => {
  console.log('onActivated')
})
</script>
<style scoped lang="scss"></style>
