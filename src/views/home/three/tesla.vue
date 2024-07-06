<template>
  <div ref="containerRef" class="container"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight, Color, GridHelper } from 'three'
import car from './car'
const containerRef = ref<HTMLElement>()
const scene = new Scene() // 场景
scene.add(car)
// 相机 PerspectiveCamera（透视摄像机）
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, 3, 5)
camera.lookAt(scene.position)

const renderer = new WebGLRenderer({
  antialias: true // 抗锯齿
}) // 渲染器
renderer.setClearColor(new Color('#444'))
renderer.setSize(600, 400)
renderer.setPixelRatio(window.devicePixelRatio)
// 网格地面
const gridHelper = new GridHelper(30)
scene.add(gridHelper)
// 环境光
const ambientLight = new AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)
// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.set(30, 10, -22)
scene.add(directionalLight)
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
  width: 600px;
  height: 400px;
}
</style>
