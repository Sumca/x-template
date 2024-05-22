import { resolve } from 'path'

import { defineConfig, UserConfig,loadEnv } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetuoExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
import transformConsolePlugin from './plugins/vitePluginTransformConsole'

import vue from '@vitejs/plugin-vue'

// ./src和src均可以，path模块会自行处理； __dirname始终返回的是当前文件所在的目录
const srcPath = resolve(__dirname, 'src') 
//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

 const config = ({mode})=> defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
  },
  plugins: [
    vue(),
    VueSetuoExtend(),
    viteCompression(), // 开启gzip压缩插件
    transformConsolePlugin(),
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
      '@': srcPath,
      '@feature': resolve(__dirname, 'src/components/feature'),
      '@bussiness': resolve(__dirname, 'src/components/bussiness'),
      '@store': resolve(__dirname, 'src/store'),
      '#':resolve(__dirname, 'src/types'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        // additionalData: '@import "@/assets/scss/global.scss";'
        additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    },
    devSourcemap: true, // 开始css Sourcemap 文件索引
    postcss: {

    }
  },
  build: {
    // rollup 配置项
    rollupOptions:{ 
      output:{
        // rollup分包，将node_modules的都分成vendor
        manualChunks:(id: string)=>{
          if(id.includes('node_modules')){
            return 'vendor'
          }
        },
        assetFileNames:'[name].[hash].[ext]',
        // chunkFileNames:'[name].[hash].[ext]'
      }
    },
    outDir: 'dist', // 文件名默认dist
    assetsDir: 'assets', // 静态资源文件名 默认assets
  }
}) 
export default config
