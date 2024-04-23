// permission.ts

import { RouteRecordRaw } from 'vue-router';

import systemRoutes from '@/router/modules/system';
import staffRoutes from '@/router/modules/staff';
import demoRoutes from '@/router/modules/demo';


// 这里假设你已经有一个函数用来从后端获取路由数据
async function fetchRoutesFromBackend(): Promise<RouteRecordRaw[]> {
  // 模拟异步请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  // 返回从后端获取的路由数据
  return backendRoutes;
}

// 这里假设你有一个函数用来从后端获取用户权限信息
async function fetchUserPermissions(): Promise<string[]> {
  // 模拟异步请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  // 返回从后端获取的用户权限信息
  return userPermissions;
}

// 这里模拟从后端获取的路由数据
const backendRoutes: RouteRecordRaw[] = [
  ...systemRoutes,
  ...staffRoutes,
  ...demoRoutes,
];

// 这里模拟从后端获取的用户权限信息
const userPermissions: string[] = ['admin'];

// 根据用户权限过滤路由
export async function filterRoutesByPermission(): Promise<RouteRecordRaw[]> {
  const routes = await fetchRoutesFromBackend();
  const permissions = await fetchUserPermissions();
  const result = routes.filter(route => {
    // 这里假设路由的权限信息存储在路由的 meta 属性中
    const requiredPermissions = route.meta?.permissions as string[] | undefined;
    if (requiredPermissions) {
      return requiredPermissions.some(permission => permissions.includes(permission));
    }
    // 如果路由没有指定权限信息，则默认允许访问
    return true;
    // return false;
  });
  return result
}
