// 最简代码，也就是这些字段必须有
export default {
  path: "/agriculturalProduction",
  meta: {
    title: "农业生产情况",
    icon: "bi:box2-fill"
  },
  children: [
    {
      path: "/agriculturalProduction/sownOutputPerHectareProduction",
      name: "sownOutputPerHectareProduction",
      component: () =>
        import(
          "@/views/agriculturalProduction/sownOutputPerHectareProduction.vue"
        ),
      meta: {
        title: "农作物生产情况"
      }
    },
    {
      path: "/agriculturalProduction/forestryProduction",
      name: "forestryProduction",
      component: () =>
        import("@/views/agriculturalProduction/forestryProduction.vue"),
      meta: {
        title: "林业及林产品生产情况"
      }
    },
    {
      path: "/agriculturalProduction/productionOfOtherProducts",
      name: "grossOutputCompoosition",
      component: () =>
        import("@/views/agriculturalProduction/productionOfOtherProducts.vue"),
      meta: {
        title: "牧渔、茶叶和水果生产情况"
      }
    }
  ]
} as RouteConfigsTable;
