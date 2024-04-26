
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
// import Layout from "@/layout/index.vue"
import NotFound from '@/views/errorPage/404.vue';
import Login from '@/views/login/index.vue';
// import staffRoutes from './modules/staff';
// import systemRoutes from './modules/system';
import { filterRoutesByPermission } from '@/utils/permission';

// 静态的路由
const constantRouters: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)', // 捕获所有路由
    component: NotFound
  },
  {
    path: "/login",
    component: Login
  },
];
// const asyncRouters = await filterRoutesByPermission() // 异步的路由
const router = createRouter({
    history: createWebHashHistory(), //替代之前的mode，是必须的
    routes:[
      ...constantRouters,
      // ...asyncRouters
    ]
});

// 路由守卫，在路由跳转前进行权限过滤
router.beforeEach(async (to, from, next) => {
  if (router.getRoutes().length === 2) { // 只包含登录路由
    const filteredRoutes = await filterRoutesByPermission();
    filteredRoutes.forEach(route => {
      router.addRoute(route);
    });
    next({ ...to, replace: true }); // 重定向到当前路由以确保路由重新解析
  } else {
    next();
  }
});

// 在路由导航解析即将完成时，动态添加权限路由
// router.beforeResolve(async (to, from, next) => {
//   if (router.getRoutes().length === 1) { // 只包含登录路由
//     const filteredRoutes = await filterRoutesByPermission();
//     filteredRoutes.forEach(route => {
//       router.addRoute(route);
//     });
//     next({ ...to, replace: true }); // 重定向到当前路由以确保路由重新解析
//   } else {
//     next();
//   }
// });

export default router;