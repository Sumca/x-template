// modules/products.ts

import { RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"

const systemRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,      // 每个路由都需要通过component指定归属的布局组件
    redirect: "/index",
    name: "Root",
    meta: { title: "首页", icon: "Menu",keepAlive: true, permissions:['admin'] },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "首页",
          icon: "Home",
          affix: true,
          keepAlive: true,
          permissions:['admin']
        },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    name: "System",
    meta: { title: "系统管理", icon: "Menu", permissions:['admin']},
    children: [
      {
        path: "/element",
        name: "ElementComp",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "菜单管理",
          icon: "Menu",
          permissions:['admin']
        },
      },
      {
        path: "/router-management",
        name: "IconPark",
        component: () => import("@/views/systemManagement/routerManagement.vue"),
        meta: {
          title: "路由管理",
          icon: "Like",
          permissions:['admin']
        },
      },
      {
        path: "/chart",
        name: "Chart",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "员工管理",
          icon: "Line",
          permissions:['admin']
        },
        children: [
          {
            path: "/line",
            name: "Line",
            component: () => import("@/views/home/home.vue"),
            meta: {
              title: "商品管理",
              icon: "Line",
              permissions:['admin']
            },
          },
          {
            path: "/bar",
            name: "Bar",
            component: () => import("@/views/home/home.vue"),
            meta: {
              title: "手机管理",
              permissions:['admin']
            },
          },
          {
            path: "/otherChart",
            name: "OtherChart",
            component: () => import("@/views/home/home.vue"),
            meta: {
              title: "会员管理",
              permissions:['admin']
            },
          },
        ],
      },
    ],
  },
];

export default systemRoutes;
