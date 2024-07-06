import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import model_sUrl from '@/assets/model_s.gltf'
import teslaChargerUrl from '@/assets/tesla.gltf'

const model = new Group()
const loaders = new GLTFLoader()

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

  model.add(scene)
})

loaders.load(teslaChargerUrl, (gltf) => {
  gltf.scene.position.set(-3, 0, -3)
  model.add(gltf.scene)
})

export default model
