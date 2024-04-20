import { useRoute, useRouter } from 'vue-router';
import { filterRoutesByPermission } from '@/utils/permission';

export function useMenuList() {
  const router = useRouter();
  const route = useRoute();

  // 在路由导航解析即将完成时，动态添加权限路由
  router.beforeResolve(async (to, from, next) => {
    if (router.getRoutes().length === 1) { // 只包含登录路由
      const filteredRoutes = await filterRoutesByPermission();
      filteredRoutes.forEach(route => {
        router.addRoute(route);
      });
      next({ ...to, replace: true }); // 重定向到当前路由以确保路由重新解析
    } else {
      next();
    }
  });

  // 返回重新获取的路由信息
  return {
    menuList: router.options.routes,
    currentRoute: route
  };
}
