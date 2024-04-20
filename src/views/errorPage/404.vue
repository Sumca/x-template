<template>
  <div>
    <h1>404 Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <p>
      Redirecting to <router-link to="/index">home page</router-link> in
      {{ countdown }} seconds...
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const countdown = ref(5) // 倒计时5秒
let timer: ReturnType<typeof setTimeout> | null = null

const redirectToHomePage = () => {
  router.push('/index') // 跳转到首页
}

const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer!)
      redirectToHomePage()
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
