import { http } from "@/utils/http";

import {
  SownOutputPerHectareType,
  ForestryProductionType,
  ProductionOfOtherProductsType
} from "@/types/AgriculturalProduction";
import {
  addRequestType,
  getRequestType,
  updateRequestType,
  deleteRequestType,
  messageType
} from "@/types/request";

export type SownOutputPerHectareRes = {
  count: number;
  data: SownOutputPerHectareType[];
};
export type ForestryProductionRes = {
  count: number;
  data: ForestryProductionType[];
};
export type ProductionOfOtherProductsRes = {
  count: number;
  data: ProductionOfOtherProductsType[];
};

/** 农作物生产情况(播种面积、单位产量、产量) */
export const getCropProduction = (data: getRequestType) => {
  return http.request<SownOutputPerHectareRes>(
    "post",
    "/api/agriculturalProduction/manger/cropProductionByYears",
    {
      data
    }
  );
};
/** 添加农作物生产情况(播种面积、单位产量、产量) */
export const addCropProduction = (
  data: addRequestType<SownOutputPerHectareType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/addCropProduction",
    {
      data
    }
  );
};
/** 修改农作物生产情况(播种面积、单位产量、产量) */
export const updeteCropProductione = (
  data: updateRequestType<SownOutputPerHectareType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/updeteCropProductione",
    {
      data
    }
  );
};
/** 删除农作物生产情况(播种面积、单位产量、产量) */
export const deleteCropProduction = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/deleteCropProduction",
    {
      data
    }
  );
};

/** 林业生产情况 */
export const forestryProductionByYears = (data: getRequestType) => {
  return http.request<ForestryProductionRes>(
    "post",
    "/api/agriculturalProduction/manger/forestryProductionByYears",
    {
      data
    }
  );
};
/** 添加林业生产情况 */
export const addForestryProduction = (
  data: addRequestType<ForestryProductionType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/addForestryProduction",
    {
      data
    }
  );
};
/** 修改林业生产情况 */
export const updeteForestryProduction = (
  data: updateRequestType<ForestryProductionType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/updeteForestryProduction",
    {
      data
    }
  );
};
/** 删除林业生产情况 */
export const deleteForestryProduction = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/deleteForestryProduction",
    {
      data
    }
  );
};

/** 牧渔、茶叶和水果生产情况 */
export const getOtherProductionSituation = (data: getRequestType) => {
  return http.request<ProductionOfOtherProductsRes>(
    "post",
    "/api/agriculturalProduction/manger/otherProductionSituationByYears",
    {
      data
    }
  );
};
/** 添加牧渔、茶叶和水果生产情况 */
export const addOtherProductionSituation = (
  data: addRequestType<ProductionOfOtherProductsType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/addOtherProductionSituation",
    {
      data
    }
  );
};
/** 修改牧渔、茶叶和水果生产情况 */
export const updeteOtherProductionSituation = (
  data: updateRequestType<ProductionOfOtherProductsType>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/updeteOtherProductionSituation",
    {
      data
    }
  );
};
/** 删除牧渔、茶叶和水果生产情况 */
export const deleteOtherProductionSituation = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalProduction/manger/deleteOtherProductionSituation",
    {
      data
    }
  );
};
