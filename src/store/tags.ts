import { defineStore } from 'pinia'
import { ref,computed, reactive, toRaw, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export const useTagsStore = defineStore('useTagsStore',()=>{
  const router = useRouter()

  let tags = ref<TagsViewItemProp[]>([])
  let activedTag = ref<TagsViewItemProp>()
  let refreshTagStatus = ref(true)
  // const getterName = computed(()=>{
  //   return name.value+'+computed'
  // })
  // 添加新的tag
  const addTag = (tag:TagsViewItemProp)=> {
    if (tags.value.some((v) => v.path === tag.path)) {
      return;
    }
    tags.value.push(tag)
  }
  // 设置actived tag
  const setActiveTag = (tag:TagsViewItemProp)=>{
    activedTag.value = tag
    router.push(tag.path)
  }
  // 移除tag
  const removeTags = (tag:TagsViewItemProp)=>{
    if(tags.value.length === 1) {
      ElMessage.warning('已经是最后一个标签！')
      return
    }
    // 如果移除的是actived，新的actived回到前一个，
    if(tag.path === activedTag?.value?.path) {
      const idx = tags.value.findIndex((v)=> v.path === tag.path)
      const newActivedTag = idx === 0 ? tags.value[idx+1] : tags.value[idx-1]
      setActiveTag(newActivedTag)
    }
    tags.value = tags.value.filter((v)=> v.path !== tag.path)
  }
  // 关闭全部tag（保留首页，回到首页）
  const removeAllTags = ()=>{
    tags.value = []
    const indexTag = { name: 'Index', title: '首页', path: '/index'}
    tags.value.push(indexTag)
    setActiveTag(indexTag)
  }
  // 刷新tag
  const refreshTag = ()=>{
    refreshTagStatus.value = false
    nextTick(()=>{
      refreshTagStatus.value = true
    })
  }
  return { 
    tags,
    activedTag,
    refreshTagStatus,
    addTag,
    setActiveTag,
    removeTags,
    removeAllTags,
    refreshTag
   }

})