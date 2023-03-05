// 最简代码，也就是这些字段必须有
export default {
  path: "/inputsAndOutputs/agriculturalProductionMechanization",
  meta: {
    title: "农业生产投入与产出",
    icon: "clarity:clipboard-solid"
  },
  children: [
    {
      path: "/inputsAndOutputs/agriculturalProductionMechanization",
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
      path: "/inputsAndOutputs/categoryGrossOutput",
      name: "categoryGrossOutput",
      component: () =>
        import("@/views/inputsAndOutputs/categoryGrossOutput.vue"),
      meta: {
        title: "农林渔牧业分类总产值"
      }
    },
    {
      path: "/inputsAndOutputs/majorAgriculturalProducts",
      name: "majorAgriculturalProducts",
      component: () =>
        import("@/views/inputsAndOutputs/majorAgriculturalProducts.vue"),
      meta: {
        title: "主要农产品产量"
      }
    }
  ]
} as RouteConfigsTable;
