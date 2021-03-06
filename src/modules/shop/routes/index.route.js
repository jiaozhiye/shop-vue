/*
 * @Author: mashaoze
 * @Date: 2020-05-17 09:36:33
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-03-28 10:49:35
 */
export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/custom/list',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@shop/pages/user/index')
    },
    {
      path: '/goods/list',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@shop/pages/goods/index')
    },
    {
      path: '/order/list',
      meta: { keepAlive: true },
      component: () => import(/* webpackChunkName: "test/demo" */ '@shop/pages/order/index')
    }
  ],
  // 注意：通过 iframe 形式加载的路由页面，路由路径必须以 /iframe 开头，
  // path 的值与 iframeRoutePath 相等
  iframes: []
};
