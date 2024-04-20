<template>
  <div class="avatar-container">
    <el-dropdown>
      <el-avatar shape="square" :src="src" />
      <span class="el-dropdown-link">
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onIndex">首页</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>文档</el-dropdown-item>
          <el-dropdown-item disabled>分配权限</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import src from '@/assets/logo.webp'
import { user } from '@/store/user'
import router from '@/router'

const onIndex = () => {
  router.push('/')
}
const users = user()
// 退出登录
const logout = () => {
  users.clearToken()
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
