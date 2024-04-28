// permission.ts

import { RouteRecordRaw } from 'vue-router';
import { getUserPermission} from '@/api/common'
import systemRoutes from '@/router/modules/system';
import staffRoutes from '@/router/modules/staff';
import demoRoutes from '@/router/modules/demo';

interface Permission {
  name: string;
  children?: Permission[];
}
// 本地配置的路由信息
const backendRoutes: RouteRecordRaw[] = [
  ...systemRoutes,
  ...staffRoutes,
  ...demoRoutes,
];
// 这里假设你已经有一个函数用来从后端获取路由数据
 const fetchRoutesFromBackend = async(): Promise<RouteRecordRaw[]> =>{
  const { data } = await getUserPermission({ userId: 123 });
  // 进行权限匹配
  let newRouters = await filterRoutersWithPermissions(backendRoutes, data);
  // 返回经过权限匹配后过滤的路由
  return newRouters;
}

// 这里是第二种方式，假设你有一个函数用来从后端获取用户权限角色 admin等
 const fetchUserPermissions = async(): Promise<string[]> =>{
  // 这里模拟从后端获取的用户权限信息
  const userPermissions: string[] = ['admin'];
  // 模拟异步请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  // 返回从后端获取的用户权限信息
  return userPermissions;
}

const filterRoutersWithPermissions = (routers: RouteRecordRaw[], permissions: Permission[]): RouteRecordRaw[]=>{
    return routers.filter(router => hasPermission(router, permissions));
}

const hasPermission = (router: RouteRecordRaw, permissions: Permission[]): boolean => {
    // 查找权限
    const matchedPermission = permissions.find(permission => permission.name === router.name);
    
    // 如果找到了权限，检查子路由的权限
    if (matchedPermission) {
        if (router.children && router.children.length > 0) {
            // 如果有子路由，递归检查每个子路由的权限
            router.children = router.children.filter(childRouter => hasPermission(childRouter, matchedPermission.children || []));
            // 只保留有权限的子路由
            return router.children.length > 0;
        } else {
            // 没有子路由或者子路由为空时，返回 true 表示有权限
            return true;
        }
    } else {
        // 如果没有找到权限，则返回 false 表示没有权限
        return false;
    }
}


// 根据用户权限过滤路由
export  const filterRoutesByPermission = async(): Promise<RouteRecordRaw[]> =>{
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
