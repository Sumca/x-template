<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header>
      <div class="title">业绩柱状图</div>
    </template>
    <div id="chart" class="chat" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, markRaw } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '600px',
    required: false,
  },
  height: {
    type: String,
    default: '300px',
    required: false,
  },
})

const options = {
  grid: {
    left: '2%',
    right: '2%',
    bottom: '10%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['收入', '毛利润', '收入增长率', '利润增长率'],
    textStyle: {
      color: '#999',
    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['浙江', '北京', '上海', '广东', '深圳'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 10000,
      interval: 2000,
      axisLabel: {
        formatter: '{value} ',
      },
    },
    {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value}%',
      },
    },
  ],
  series: [
    {
      name: '收入',
      type: 'bar',
      data: [7000, 7100, 7200, 7300, 7400],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
    },
    {
      name: '毛利润',
      type: 'bar',
      data: [8000, 8200, 8400, 8600, 8800],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#25d73c' },
          { offset: 0.5, color: '#1bc23d' },
          { offset: 1, color: '#179e61' },
        ]),
      },
    },
    {
      name: '收入增长率',
      type: 'line',
      yAxisIndex: 1,
      data: [60, 65, 70, 75, 80],
      itemStyle: {
        color: '#67C23A',
      },
    },
    {
      name: '利润增长率',
      type: 'line',
      yAxisIndex: 1,
      data: [70, 75, 80, 85, 90],
      itemStyle: {
        color: '#409EFF',
      },
    },
  ],
}
const chart = ref<any>('')
onMounted(() => {
  // 图表初始化
  // chart.value = markRaw(
  //   echarts.init(document.getElementById('chart') as HTMLDivElement)
  // )
  const dom = document.getElementById('chart')
  chart.value = echarts.init(dom)

  chart.value.setOption(options)

  // 大小自适应
  // window.addEventListener('resize', () => {
  //   chart?.value?.resize()
  // })
})
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>
