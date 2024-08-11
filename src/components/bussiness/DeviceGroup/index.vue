<template>
  <div class="device-group-container">
    <el-row class="device-item" v-for="(item, index) in list" :key="index">
      <el-col :span="8">
        <gl-select v-model="item.device" :options="options"></gl-select>
      </el-col>
      <el-col :span="8">
        <el-input v-model="item.count"></el-input>
      </el-col>
      <el-col :span="2">
        <el-text class="mx-1">个/套</el-text>
      </el-col>
      <el-col :span="4">
        <el-button size="small" type="primary" @click="onAdd(index)" :icon="Plus" />
        <el-button v-show="list.length > 1" size="small" type="primary" @click="onMinus(index)" :icon="Minus" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="DeviceGroup">
import { ref } from 'vue'
import GlSelect from '@feature/gl-select/index.vue'
import { Plus, Minus } from '@element-plus/icons-vue'

interface ListItemProp {
  device: string
  count: string
}

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

const list = defineModel<ListItemProp[]>({
  default: () => [{ device: '', count: '' }]
})

// 在指定位置添加一个新项
const onAdd = (index: number) => {
  list.value.splice(index + 1, 0, { device: '', count: '' })
}

// 删除指定位置的项
const onMinus = (index: number) => {
  if (list.value.length > 1) {
    list.value.splice(index, 1)
  }
}
</script>

<style scoped lang="scss">
.device-group-container {
  width: 100%;
  .device-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
