import { resolve } from 'path'
import path from 'path'

import { defineConfig, UserConfig,loadEnv } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html";
import vue from '@vitejs/plugin-vue'

const srcPath = resolve(__dirname, 'src')
//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

 const config = ({mode})=> defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
          title: getViteEnv(mode, "VITE_APP_TITLE"),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@feature': path.resolve(__dirname, './src/components/feature'),
      '@bussiness': path.resolve(__dirname, './src/components/bussiness'),
      '@store': path.resolve(__dirname, './src/store'),
      '#':path.resolve(__dirname, './src/types'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        // additionalData: '@import "@/assets/scss/global.scss";'
        additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    }
  },
}) 
export default config
