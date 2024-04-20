// modules/products.ts

import { RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"

const staffRoutes: RouteRecordRaw[] = [
  {
    path: "/user",
    name: "User",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "Setting",
    },
    children: [
      {
        path: "/role",
        name: "role",
        component: () => import("@/views/userManagement/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "Faild",
        },
      },
      {
        path: "/permissions",
        name: "permissions",
        component: () => import("@/views/userManagement/permissions/index.vue"),
        meta: {
          title: "权限管理",
          icon: "Interrupt",
        },
      },
    ],
  },
];

export default staffRoutes;
