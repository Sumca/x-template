<template>
  <div>Home</div>
  <div>count: {{ count }}</div>
  <el-button @click="onAdd">add</el-button>
</template>

<script lang="ts" setup name="Home">
import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
// ref 和 reactive 有什么区别，ref 一般处理基本类型；reactive 处理复杂的数据类型
const props = defineProps({
  squreProp: {
    type: Object as PropType<SquareConfig>,
    requre: false,
  },
})
let msg: any = ref('hahahahha')
let obj: any = reactive({
  a: '222',
  b: '222333',
})

function test(val: SquareConfig): void {
  console.log('test val', val)
}
function changes(): void {
  msg.value = 'change hahahah'
  obj.a = '555'
  test({ color: 'red', width: 100 })
}
//
function sendFn(val: any): void {
  console.log(val)
  const a = '1'
}
let count = ref(0)
const onAdd = () => {
  count.value++
}
onMounted(() => {
  console.log('onMounted')
})
onActivated(() => {
  console.log('onActivated')
})
</script>
<style></style>
