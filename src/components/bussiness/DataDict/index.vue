<template>
  <gl-select v-bind="$attrs" :options="options"></gl-select>
</template>

<script lang="ts" setup name="DataDict">
import { ref, PropType, watch } from 'vue'
import GlSelect from '@feature/gl-select/index.vue'
import { getSelectApi } from '@/api/bussiness'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const options = ref([])
const params = { url: props.url }
getSelectApi(params).then(({ data }) => {
  options.value = data || []
})
</script>
