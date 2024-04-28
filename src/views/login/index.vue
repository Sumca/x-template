<template>
  <div class="login-container">
    <el-card style="max-width: 100%">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.number="form.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="onLogin">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { user } from '@/store/user'
import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
// import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/common'

const formRef = ref()

const rules = reactive<FormRules<typeof form>>({
  name: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
})
const form = reactive({ name: '', password: '' })

//
const onLogin = async () => {
  await formRef?.value?.validate()
  const { data } = await loginApi(form)
  const token = data?.token
  const users = user()
  // 设置token
  users.setToken(token)
  router.push('/') // 跳转首页
}
</script>
<style scoped>
.login-container {
  width: 50%;
  margin: 0 auto;
}
</style>
