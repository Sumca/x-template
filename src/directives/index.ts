import { App } from 'vue'
import { defaultPermission } from './btn-permission'
import { debounce } from './debounce'

export const useAllBtnPermission = (app:App<Element>)=>{
  defaultPermission(app)
  debounce(app)
}