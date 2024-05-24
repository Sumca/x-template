import { getTranslateApi } from '@/api/common'
export type Lang  = 'zh' | 'en'
export const setLocalTranslate = async()=>{
  const { data } = await getTranslateApi()
  localStorage.setItem('localTranslateInfo', JSON.stringify(data))
}
export const getLocalTranslateInfo = (lang:Lang)=>{
  const translateInfo = localStorage.getItem('localTranslateInfo')
  const translate = JSON.parse(translateInfo as string)
  return translate?.[lang]
}