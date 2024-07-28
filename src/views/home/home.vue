<template>
  <div class="home-container">
    <div class="cards">
      <template v-for="item in cards" :key="item.key">
        <div class="card">
          <div class="title">
            {{ item.title }}
            <el-icon :size="16" :color="item.iconColor">
              <component :is="item.icon" />
            </el-icon>
          </div>
          <div class="value">{{ item.value }}</div>
          <div class="rate">{{ item.rate }}</div>
        </div>
      </template>
    </div>
    <div class="home-data">
      <div class="left slide">
        <div class="slide-item">
          <ChartPie />
        </div>
        <div class="slide-item">
          <ChartLine />
        </div>
      </div>
      <div class="center">
        <!-- <Axes /> -->
        <!-- <Line /> -->
        <Tesla />
      </div>
      <div class="right slide">
        <div class="slide-item">
          <ChartBar />
        </div>
        <div class="slide-item">
          <ChartBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Home">
import Axes from './three/axes.vue'
import Line from './three/line.vue'
import Tesla from './three/tesla.vue'
import ChartPie from '@bussiness/ChartPie/index.vue'
import ChartLine from '@bussiness/ChartLine/index.vue'
import ChartBar from '@bussiness/ChartBar/index.vue'

import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
interface card {
  title: string
  key: string
  value: number
  rate: string
  icon?: string
  iconColor?: string
}
const cards: card[] = [
  {
    title: '需求人数',
    key: '1',
    value: 363,
    rate: '+20%',
    icon: 'Watermelon',
    iconColor: '#409EFF'
  },
  {
    title: '提问数量',
    key: '2',
    value: 233,
    rate: '+10%',
    icon: 'IceTea',
    iconColor: '#67C23A'
  },
  {
    title: '解决数量',
    key: '3',
    value: 336,
    rate: '+23%',
    icon: 'ForkSpoon',
    iconColor: '#67C23A'
  },
  {
    title: '用户满意度',
    key: '4',
    value: 100,
    rate: '+100%',
    icon: 'Apple',
    iconColor: '#E6A23C'
  }
]

onMounted(() => {
  console.log('onMounted')
})
onActivated(() => {
  console.log('onActivated')
})
</script>
<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgb(30, 30, 63);
  .cards {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    .card {
      padding: 10px;
      box-sizing: border-box;
      background-color: rgb(90, 90, 159);
      width: 24%;
      color: #fff;
      border-radius: 4px;
      text-align: left;
      .title {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
      .value {
        font-size: 16px;
        font-weight: 600;
      }
      .rate {
        font-size: 12px;
        color: #3ab57e;
      }
    }
  }
  .home-data {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    .slide {
      width: 350px;
      .slide-item {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
      }
    }
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }
}
</style>
