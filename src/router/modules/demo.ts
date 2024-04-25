// modules/products.ts

import { RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"

const demoRoutes: RouteRecordRaw[] = [
  {
    path: "/demo",
    component: Layout,
    redirect: "/demo",
    name: "Demo",
    meta: { 
      title: "DEMO", 
      icon: "Menu", 
      keepAlive: true,
      permissions:['admin'] 
    },
    children: [
      {
        path: "/demo1",
        name: "Demo1",
        component: () => import("@/views/demoPage/demo.vue"),
        meta: {
          title: "DEMO1",
          icon: "Home",
          affix: true,
          keepAlive: true,
          permissions:['admin']
        },
      },
      {
        path: "/chat",
        name: "Chat",
        component: () => import("@/views/demoPage/chat.vue"),
        meta: {
          title: "图表",
          icon: "Home",
          affix: true,
          keepAlive: true,
          permissions:['admin']
        },
      },
    ],
  },
];

export default demoRoutes;
