<template>
  <div>
    <el-button plain @click="dialogVisible = true">{{ btnName }}</el-button>
    <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
      <span>内容你自己写 This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => done()
const props = defineProps({
  btnName: {
    type: String,
    default: 'btn',
    coment: '按钮名称'
  }
})
</script>
