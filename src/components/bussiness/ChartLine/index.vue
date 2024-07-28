<!--  line 图 -->
<template>
  <div class="line-card">
    <div class="title">{{ title }}</div>
    <div ref="chartRef" class="chat" :style="{ height, width }"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, markRaw } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '折线图',
    required: false
  },
  width: {
    type: String,
    default: '100%',
    required: false
  },
  height: {
    type: String,
    default: '100%',
    required: false
  }
})

const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [520, 1932, 3901, 934],
      type: 'line',
      smooth: true
    }
  ]
}
const chart = ref<any>('')
const chartRef = ref<HTMLElement>()
onMounted(() => {
  chart.value = echarts.init(chartRef.value)
  chart.value.setOption(options)
})
// 大小自适应
window.addEventListener('resize', () => {
  console.log(123)
  chart?.value?.resize()
})
</script>
<style lang="scss" scoped>
.line-card {
  width: 100%;
  height: 100%;
}
.title {
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
</style>
