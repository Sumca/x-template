import { App } from 'vue'
import { defaultPermission } from './btn-permission'

export const useAllBtnPermission = (app:App<Element>)=>{
  defaultPermission(app)
}