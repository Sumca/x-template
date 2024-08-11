<template>
  <div class="ratio-bar-container">
    <div class="label">{{ label }}</div>
    <div class="bars">
      <div
        :class="[bar.border ? 'border' : '', 'bar']"
        v-for="(bar, index) in data"
        :key="index"
        :style="{
          backgroundColor: bar.background,
          width: getPercentage(bar.count)
        }"
      >
        <el-tooltip :disabled="!bar.tips" effect="dark" :content="bar.tips" placement="top-start">
          <div class="cell">{{ bar.count }}</div>
        </el-tooltip>
      </div>
    </div>
    <div class="desc">{{ total }}架</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, reactive } from 'vue'

interface BarProp {
  count: number
  label?: string
  type?: string
  background?: string
  border?: boolean
  tips?: string
}
const props = defineProps({
  label: String,
  data: {
    type: Array as PropType<BarProp[]>,
    default: () => []
  }
})
const total = props.data.reduce((sum, item) => sum + item.count, 0)

const getPercentage = (val: number) => (val * 100) / total + '%'
</script>
<style scoped lang="scss">
.ratio-bar-container {
  display: flex;
  width: 100%;
  height: 20px;
  .label {
    width: 80px;
    display: flex;
    align-items: center;
  }
  .bars {
    flex: 1;
    display: flex;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    overflow: hidden;
    .bar {
      display: flex;
      align-items: center;
      justify-content: center;
      .cell {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
    .border {
      border: 2px solid #f56c6c;
      // box-shadow: 15px #f56c6c;
    }
  }
  .desc {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
