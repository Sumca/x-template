import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import model_sUrl from '@/assets/tesla_model_s_plaid_2023_glTF/scene.gltf'
import teslaChargerUrl from '@/assets/tesla.gltf'
import pottedPlantUrl from '@/assets/potted_plant_04/potted_plant_04_4k.gltf'
const model = new Group()
const loaders = new GLTFLoader()
// 车
loaders.load(model_sUrl, (gltf) => {
  const { scene } = gltf
  console.log('scene: ', scene)
  // scene.traverse 递归遍历所有的模型
  scene.traverse((obj) => {
    if (obj instanceof Mesh) {
      const material = obj.material as MeshStandardMaterial;
      if (material.metalness !== undefined) {
        material.metalness = 0.7
      }
    }
    console.log('obj: ', obj)
  })
  scene.scale.set(0.02, 0.02, 0.02);
  scene.rotation.y = -Math.PI / 2; //
  model.add(scene)
})
// 充电桩
loaders.load(teslaChargerUrl, (gltf) => {
  gltf.scene.position.set(-3, 0, -3)
  model.add(gltf.scene)
})
// 盆栽的模型
loaders.load(pottedPlantUrl, (gltf) => {
  gltf.scene.position.set(-1, 0, 3)
  model.add(gltf.scene)
})

export default model
