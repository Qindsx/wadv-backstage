// 最简代码，也就是这些字段必须有
export default {
  path: "/agriculturalProductionMechanization",
  meta: {
    title: "农业生产投入与产出",
    icon: "clarity:clipboard-solid"
  },
  children: [
    {
      path: "/agriculturalProductionMechanization",
      name: "agriculturalProductionMechanization",
      component: () =>
        import(
          "@/views/inputsAndOutputs/agriculturalProductionMechanization.vue"
        ),
      meta: {
        title: "农业生产投入情况"
      }
    },
    {
      path: "/agriculturalProductionMechanization/categoryGrossOutput",
      name: "categoryGrossOutput",
      component: () =>
        import("@/views/inputsAndOutputs/categoryGrossOutput.vue"),
      meta: {
        title: "农林牧渔总产值及指数"
      }
    },
    {
      path: "/agriculturalProductionMechanization/majorAgriculturalProducts",
      name: "majorAgriculturalProducts",
      component: () =>
        import("@/views/inputsAndOutputs/majorAgriculturalProducts.vue"),
      meta: {
        title: "农林牧渔分类总产值"
      }
    }
  ]
} as RouteConfigsTable;
