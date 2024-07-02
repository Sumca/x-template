<template>
  <div ref="containerRef" class="container"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Scene, PerspectiveCamera, WebGLRenderer, Color, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
const containerRef = ref<HTMLElement>()

const scene = new Scene() // 场景
const renderer = new WebGLRenderer() // 渲染器
// 相机 PerspectiveCamera（透视摄像机）
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(20, 20, 30)
camera.lookAt(scene.position)

renderer.setClearColor(new Color('#f2d4a2'))
renderer.setSize(300, 200)
const axes = new AxesHelper(20)
scene.add(axes)

//控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
  animate()
})
</script>
<style scoped lang="scss">
.container {
  width: 300px;
  height: 200px;
}
</style>
