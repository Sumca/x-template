// request.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { user } from '@/store/user'
const baseURL = import.meta.env.VITE_APP_API_BASEURL
const mockURL = import.meta.env.VITE_APP_API_MOCKURL

const setBaseUrl = (url:string):string =>{
  return url.startsWith('/mock') ? mockURL : baseURL
}
// 创建 Axios 实例
const requset: AxiosInstance = axios.create({
  // baseURL, // API 地址
  timeout: 10000, // 设置请求超时时间
});

// 请求拦截器
requset.interceptors.request.use(
  (config: any) => {
    // 在请求发送之前
    const users = user()
    const token = users.getToken()
    config.baseURL = setBaseUrl(config.url) // 设置baseUrl
    if(config.url === '/mock/login') return config
    if (token) {
      config.headers = { ...config.headers,Authorization: `Bearer ${token}` }; // 设置请求头部的 token
    } 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器

requset.interceptors.response.use(
  (response:AxiosResponse) => {
    // 对响应数据
    if (response.status === 200) {
      const { code, data } = response?.data;
      if (code === '200') {
        return { data } as AxiosResponse<any, any>;
      } else {
        errorMessage(code);
        return Promise.reject(new Error('请求错误'));
      }
    } else {
      errorMessage(response.status);
      return Promise.reject(new Error('请求错误'));
    }
  },
  error => {
    // 对响应错误
    if(error.response.status === 401 || error.response.status === 403){
      ElMessage.error('登录失效，请重新登录')
      router.push('/login');
    }else {
      errorMessage(error.response.status)
    }
    return Promise.reject(error);
  }
);
const errorMessage = (status:Number|string)=> {
  ElMessage.error('Oops, error status:'+status)
}
export default requset;


