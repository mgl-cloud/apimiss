import { createWebHistory, createRouter} from 'vue-router'
import { constantRoutes, dynamicRoutes } from '/@/router/router';
const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes,...dynamicRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

/**
 * 获取当前用户权限标识去比对路由表（未处理成多级嵌套路由）
 * @description 这里主要用于动态路由的添加，router.addRoute
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param chil dynamicRoutes（/@/router/route）第一个顶级 children 的下路由集合
 * @returns 返回有当前用户权限标识的路由数组
 */
/*  export function setFilterRoute(chil: any) {
	let filterRoute: any = [];
	chil.forEach((route: any) => {
		if (route.meta.roles) {
			route.meta.roles.forEach((metaRoles: any) => {
				store.state.userInfos.userInfos.roles.forEach((roles: any) => {
					if (metaRoles === roles) filterRoute.push({ ...route });
				});
			});
		}
	});
	return filterRoute;
}
 */
/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @description 替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
/*  export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes));
	filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), { ...pathMatch }];
	return filterRouteEnd;
}
 */
/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
/* export async function addRoute() {
	await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
		const routeName: any = route.name;
		if (!router.hasRoute(routeName)) router.addRoute(route);
	});
} */

export default router;
