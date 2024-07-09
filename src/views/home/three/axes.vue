<template>
  <div ref="containerRef" class="container"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, onActivated, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AxesHelper,
  BoxGeometry,
  ConeGeometry,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  DirectionalLight,
  GridHelper
} from 'three'
// import car from './car'
const containerRef = ref<HTMLElement>()

const scene = new Scene() // 场景

// scene.add(car)
// 相机 PerspectiveCamera（透视摄像机）
const camera = new PerspectiveCamera(45, 3 / 2, 0.1, 1000)
camera.position.set(20, 20, 30)
camera.lookAt(scene.position)

const renderer = new WebGLRenderer({
  antialias: true // 抗锯齿
}) // 渲染器
renderer.setClearColor(new Color('#666'))
renderer.setSize(600, 400)
renderer.setPixelRatio(window.devicePixelRatio)
// 坐标轴
const axes = new AxesHelper(40)
scene.add(axes)
// 网格地面
const gridHelper = new GridHelper(300)
scene.add(gridHelper)

// 物体1
const geometry = new BoxGeometry(5, 5, 5) // 形状
const meterial = new MeshLambertMaterial({ color: '#0f0' }) // 材质
const mesh = new Mesh(geometry, meterial) // 物体
mesh.position.set(13, 8, 10) // 物体位置
scene.add(mesh)
// 物体2
const circle = new ConeGeometry(5, 20, 30) // 形状
const meterial2 = new MeshPhongMaterial({ color: '#eee', shininess: 5555 }) // 材质
const mesh2 = new Mesh(circle, meterial2) // 物体
mesh2.position.set(-13, 8, 10) // 物体位置
scene.add(mesh2)
// 环境光
const ambientLight = new AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)
// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 100, -100)
scene.add(directionalLight)

// 点光源
const pointLight = new PointLight(0xffffff, 21)
pointLight.decay = 0.4 // 衰减，默认2
pointLight.position.set(0, 20, 0)
// scene.add(pointLight)
//控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()
const animate = () => {
  mesh.rotateY(0.01)
  mesh2.rotateX(0.005)
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
