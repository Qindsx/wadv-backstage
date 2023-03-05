import { http } from "@/utils/http";

import {
  CategoryOutputValueDatum,
  RroductionConditionsAndInputsDatum,
  AgriculturalProductionDatum
} from "@/types/AgriculturalInputsOutputs";
import {
  addRequestType,
  getRequestType,
  updateRequestType,
  deleteRequestType,
  messageType
} from "@/types/request";
export type CategoryOutputValueRes = {
  count: number;
  data: CategoryOutputValueDatum[];
};
export type RroductionConditionsAndInputsDatumRes = {
  count: number;
  data: RroductionConditionsAndInputsDatum[];
};
export type AgriculturalProductionRes = {
  count: number;
  data: AgriculturalProductionDatum[];
};

/*农业相关投入与机械化 */
export const getProductionConditionsAndInputs = (data: getRequestType) => {
  return http.request<RroductionConditionsAndInputsDatumRes>(
    "post",
    "/api/agriculturalInputsOutputs/manger/productionConditionsAndInputsByYears",
    {
      data
    }
  );
};
/*添加农业相关投入与机械化 */
export const addProductionConditionsAndInputs = (
  data: addRequestType<RroductionConditionsAndInputsDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/addProductionConditionsAndInputs",
    {
      data
    }
  );
};
/*修改农业相关投入与机械化 */
export const updeteProductionConditionsAndInputs = (
  data: updateRequestType<RroductionConditionsAndInputsDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/updeteProductionConditionsAndInputs",
    {
      data
    }
  );
};

/*删除农业相关投入与机械化 */
export const deleteProductionConditionsAndInputs = (
  data: deleteRequestType
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/deleteProductionConditionsAndInputs",
    {
      data
    }
  );
};

/*农林牧渔业分类总产值 */
export const getCategoryOutputValue = (data: getRequestType) => {
  return http.request<CategoryOutputValueRes>(
    "post",
    "/api/agriculturalInputsOutputs/manger/categoryOutputValueByYears",
    {
      data
    }
  );
};
/*添加农林牧渔业分类总产值 */
export const addCategoryOutputValue = (
  data: addRequestType<CategoryOutputValueDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/addCategoryOutputValue",
    {
      data
    }
  );
};
/*修改农林牧渔业分类总产值 */
export const updeteCategoryOutputValue = (
  data: updateRequestType<CategoryOutputValueDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/updeteCategoryOutputValue",
    {
      data
    }
  );
};
/*删除农林牧渔业分类总产值 */
export const deleteCategoryOutputValue = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/deleteCategoryOutputValue",
    {
      data
    }
  );
};

/*主要农产品产量 */
export const getAgriculturalProduction = (data: getRequestType) => {
  return http.request<AgriculturalProductionRes>(
    "post",
    "/api/agriculturalInputsOutputs/manger/agriculturalProductionByYears",
    {
      data
    }
  );
};
/*添加主要农产品产量 */
export const addAgriculturalProduction = (
  data: addRequestType<AgriculturalProductionDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/addAgriculturalProduction",
    {
      data
    }
  );
};
/*修改主要农产品产量 */
export const updeteAgriculturalProduction = (
  data: updateRequestType<AgriculturalProductionDatum>
) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/updeteAgriculturalProduction",
    {
      data
    }
  );
};
/*删除主要农产品产量 */
export const deleteAgriculturalProduction = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/agriculturalInputsOutputs/manger/deleteAgriculturalProduction",
    {
      data
    }
  );
};
