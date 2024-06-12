<template>
  <el-card style="max-width: 100%" class="x-form-crad">
    <template #header v-if="showTitle">
      <div class="card-header">
        <div class="title">{{ title }}</div>
      </div>
    </template>
    <el-form ref="formRef" v-bind="$attrs" :model="form" :label-width="labelWidth || '80px'">
      <slot name="before" />
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="item.span || 6">
            <el-form-item :label="item.label" :prop="item.prop">
              <component
                :is="_getComponent(item)"
                v-bind="{ ..._getComponentProp(item.type), ...item.attrs }"
                v-model="form[item.prop]"
                v-on="{ ...item.linstener }"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col v-if="showButtons" :span="6" class="text-align__right">
          <el-button @click="onClickQuery" type="primary">查询</el-button>
          <el-button @click="onClickReset" type="primary">清空</el-button>
          <!-- <el-button v-if="collapseable" type="text" class="expand-button" @click="handleUpdateValue">
          <span class="status-text">{{ statusText }} </span>
          <i :class="isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
        </el-button> -->
        </el-col>
      </el-row>
    </el-form>
    <!-- <template #footer>Footer content</template> -->
  </el-card>
</template>

<script lang="ts" setup name="GlForm">
import { getComponent, getComponentProp } from './config/factory'

import { ref, onMounted, PropType } from 'vue'

const props = defineProps({
  formItems: Array as PropType<ItemProp[]>,
  title: String,
  labelWidth: String,
  showTitle: {
    type: Boolean,
    default: true,
    comment: '是否展示标题'
  },
  showButtons: {
    type: Boolean,
    default: true,
    comment: '是否展示按钮'
  }
})
// do not use same name with ref
const form = defineModel() as object
// const form = ref(props.modelValue) as object
const _getComponent = (item: ItemProp) => {
  return getComponent(item)
}
const _getComponentProp = (type?: string) => {
  if (type) return getComponentProp(type)
}

//
const emit = defineEmits(['submit', 'reset'])
const onClickQuery = () => emit('submit')
const onClickReset = () => emit('reset')
//
const elFormMethods = ref({})
const formRef = ref()
onMounted(() => {
  const refMethods = Object.entries(formRef.value as object).filter(([_, value]) => value instanceof Function)
  refMethods.forEach(([key, value]) => {
    elFormMethods.value[key] = value
  })
})
defineExpose(elFormMethods.value)
//
</script>
<style lang="scss" scoped>
.title {
  text-align: left;
  font-weight: 600;
}
</style>
