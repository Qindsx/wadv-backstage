// 最简代码，也就是这些字段必须有
export default {
  path: "/basic",
  meta: {
    title: "农村农业基本信息",
    icon: "mingcute:government-line"
  },
  children: [
    {
      path: "/basic",
      name: "basic",
      component: () => import("@/views/basic/basic.vue"),
      meta: {
        title: "农村基础基本信息"
      }
    },
    {
      path: "/basic/grossIndicesgross",
      name: "grossIndicesgross",
      component: () => import("@/views/basic/grossIndicesgross.vue"),
      meta: {
        title: "农林牧渔业总产值及指数"
      }
    },
    {
      path: "/basic/grossOutputCompoosition",
      name: "grossOutputCompoosition",
      component: () => import("@/views/basic/grossOutputCompoosition.vue"),
      meta: {
        title: "农林牧渔业总产值及构成"
      }
    }
  ]
} as RouteConfigsTable;
