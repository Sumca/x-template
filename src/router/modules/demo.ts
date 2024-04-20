// modules/products.ts

import { RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"

const demoRoutes: RouteRecordRaw[] = [
  {
    path: "/demo",
    component: Layout,
    redirect: "/demo",
    name: "Demo",
    meta: { title: "DEMO", icon: "Menu",permissions:['admin'] },
    children: [
      {
        path: "/demo",
        name: "demo1",
        component: () => import("@/views/demoPage/demo.vue"),
        meta: {
          title: "demo1",
          icon: "Home",
          affix: true,
          noKeepAlive: true,
          permissions:['admin']
        },
      },
    ],
  },
];

export default demoRoutes;
