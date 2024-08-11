<template>
  <div>
    <p>状态</p>
    <div>
      <!--  -->
      <el-segmented v-model="value" :options="options">
        <template #default="{ item }">
          <div class="flex flex-col items-center gap-2 p-2">
            <el-icon size="20">
              <component :is="item.icon" />
            </el-icon>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </el-segmented>
      <!--  -->
      <el-timeline style="max-width: 600px">
        <template v-for="item in dataList">
          <el-timeline-item :timestamp="item.timestamp" placement="top">
            <el-card>
              <div class="timeline-content">
                <div class="bar">
                  <RatioBar label="自用" :data="item.aList" />
                  <RatioBar label="可租借" :data="item.bList" />
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </template>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Apple, Cherry, Grape } from '@element-plus/icons-vue'
import RatioBar from '@feature/ratio-bar/index.vue'
import Background from 'three/examples/jsm/renderers/common/Background'

// const props = defineProps({
//   btnName: {
//     type: String,
//     default: 'btn',
//     coment: '按钮名称'
//   }
// })
const value = ref('Apple')
const options = [
  {
    label: '7天内',
    value: '7',
    icon: Apple
  },
  {
    label: '14天内',
    value: '14',
    icon: Cherry
  },
  {
    label: '30天内',
    value: '30',
    icon: Grape
  }
]
const dataList = [
  {
    timestamp: '2018/4/12',
    aList: [
      { count: 4000, label: 'a', background: '#409eff' },
      { count: 1000, label: 'b', background: '#E6A23C', border: true, tips: 'border' },
      { count: 2000, label: 'c', background: '#67c23a' }
    ],
    bList: [
      { count: 2500, label: 'a', background: '#409eff' },
      { count: 2000, label: 'b', background: '#E6A23C' },
      { count: 1500, label: 'c', background: '#67c23a' }
    ]
  },
  {
    timestamp: '2018/4/11',
    aList: [
      { count: 4000, label: 'a', background: '#409eff' },
      { count: 1000, label: 'b', background: '#E6A23C', border: true, tips: 'border' },
      { count: 2000, label: 'c', background: '#67c23a' }
    ],
    bList: [
      { count: 2500, label: 'a', background: '#409eff' },
      { count: 2000, label: 'b', background: '#E6A23C' },
      { count: 1500, label: 'c', background: '#67c23a' }
    ]
  },
  {
    timestamp: '2018/4/11',
    aList: [
      { count: 4000, label: 'a', background: '#409eff' },
      { count: 1000, label: 'b', background: '#E6A23C', border: true, tips: 'border' },
      { count: 2000, label: 'c', background: '#67c23a' }
    ],
    bList: [
      { count: 2500, label: 'a', background: '#409eff' },
      { count: 2000, label: 'b', background: '#E6A23C' },
      { count: 1500, label: 'c', background: '#67c23a' }
    ]
  },
  {
    timestamp: '2018/4/11',
    aList: [
      { count: 4000, label: 'a', background: '#409eff' },
      { count: 1000, label: 'b', background: '#E6A23C', border: true, tips: 'border' },
      { count: 2000, label: 'c', background: '#67c23a' }
    ],
    bList: [
      { count: 2500, label: 'a', background: '#409eff' },
      { count: 2000, label: 'b', background: '#E6A23C' },
      { count: 1500, label: 'c', background: '#67c23a' }
    ]
  }
]
</script>
<style scoped lang="scss">
.timeline-content {
  display: flex;
  .bar {
    flex: 1;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
