<template>
  <div class="home-container">
    <div class="cards">
      <template v-for="item in cards" :key="item.key">
        <div class="card">
          {{ item.title }}
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
}
const cards: card[] = [
  {
    title: '111',
    key: '1'
  },
  {
    title: '222',
    key: '2'
  },
  {
    title: '333',
    key: '3'
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
    height: 60px;
    display: flex;
    justify-content: space-between;
    .card {
      background-color: rgb(90, 90, 159);
      width: 30%;
      color: #fff;
      border-radius: 4px;
    }
  }
  .home-data {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 70px);
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
