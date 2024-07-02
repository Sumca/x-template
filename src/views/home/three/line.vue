<template>
  <div ref="containerRef" class="container"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, LineBasicMaterial, Vector3, BufferGeometry, Line, Color } from 'three'
const containerRef = ref<HTMLElement>()

const scene = new Scene() // 场景

const renderer = new WebGLRenderer() // 渲染器
renderer.setClearColor(new Color('#f35487'))

renderer.setSize(200, 200)

// 相机 PerspectiveCamera（透视摄像机）
const camera = new PerspectiveCamera(45, 3 / 2, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)
// 材质
const material = new LineBasicMaterial({ color: '#0000ff' })
const points = []
points.push(new Vector3(-10, 0, 0))
points.push(new Vector3(0, 10, 0))
points.push(new Vector3(10, 0, 0))
const geometry = new BufferGeometry().setFromPoints(points)

//
const line = new Line(geometry, material)
scene.add(line)
//
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
  renderer.render(scene, camera)
})
</script>
<style scoped lang="scss">
.container {
  width: 300px;
  height: 200px;
}
</style>
