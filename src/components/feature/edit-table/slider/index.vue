<template>
  <div class="table-slider">
    <!--  -->
    <div class="slider-list" v-show="sliderListVisible">
      <h3 class="title">勾选需要显示的列</h3>
      <div class="checkbox-content">
        <el-checkbox
          class="checkbox-item checkbox-all"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          选择全部
        </el-checkbox>
        <el-checkbox-group
          v-model="checkedColumns"
          @change="handleCheckedColumn"
        >
          <el-checkbox
            class="checkbox-item"
            v-for="column in columns"
            :key="column.prop"
            :label="column.label"
            :value="column.prop"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="column.label"
              placement="top-start"
            >
              {{ column.label }}
            </el-tooltip>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <!--操作按钮 -->
    <div class="slider-btn">
      <div class="slider-btn-item" @click="handelClickBtn('Columns')">
        <el-icon><Operation /></el-icon> Columns
      </div>
      <div class="slider-btn-item" @click="handelClickBtn('Filter')">
        <el-icon><Filter /></el-icon> Filter
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="TableSlide">
import { ref, reactive, watch } from 'vue'

const { columns = [] } = defineProps<{
  columns: ColumnProp[]
}>()

// 展开折叠面板
const sliderListVisible = ref(false)
const handelClickBtn = (type: string) => {
  sliderListVisible.value = !sliderListVisible.value
}
// 勾选
const checkAll = ref(true)
const isIndeterminate = ref(false)
const allProps = columns.map((i) => i.prop)
const checkedColumns = ref<string[]>(allProps)
//全部
const handleCheckAllChange = (val: boolean) => {
  checkedColumns.value = val ? allProps : []
  isIndeterminate.value = false
}
// 勾选 每一个checkbook
const handleCheckedColumn = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === columns.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < columns.length
}
// 返回 勾选中的列
const emit = defineEmits(['checkedColumnsChange'])
watch(checkedColumns, (val) => {
  emit('checkedColumnsChange', val)
})
</script>
<style lang="scss" scoped>
.table-slider {
  background-color: var(--theme-drak-background-color-3);
  position: absolute;
  height: calc(100% - 20px);
  overflow-y: auto;
  right: 0;
  top: 0;
  z-index: 1;
  display: flex;

  .slider-list {
    width: 180px;
    padding: 0px 16px;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    .title {
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: var(--theme-drak-background-color-3);
    }
  }
  .slider-btn {
    width: 20px;
    height: 100%;
    border-left: 1px solid #ccc;
    .slider-btn-item {
      width: 100%;
      margin-bottom: 10px;
      writing-mode: vertical-lr;
      cursor: pointer;
    }
    .slider-btn-item:hover {
      font-weight: 600;
    }
  }
}
.checkbox-item {
  width: 100%;
}
:deep(.checkbox-item .el-checkbox__label) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.checkbox-all {
  margin-bottom: 6px;
  /* 选择全部 的 checkbook 自动吸顶
  background-color: var(--theme-drak-background-color-3);
  z-index: 2;
  position: sticky;
  top: 20px;
  */
}
</style>
