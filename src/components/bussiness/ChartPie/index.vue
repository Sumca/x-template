<!--  pie 图 -->
<template>
  <div class="pie-card">
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
    default: '饼图',
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
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   top: '5%',
  //   left: 'center'
  // },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}
const chart = ref<any>('')
const chartRef = ref<HTMLElement>()
onMounted(() => {
  // const dom = document.getElementById('chart-pie')
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
.pie-card {
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
