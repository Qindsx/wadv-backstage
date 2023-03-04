import { http } from "@/utils/http";

import {
  GrossIndicesgross3Type,
  GrossOutputCompoosition4Type,
  RuralInfrastructure1Type
} from "@/types/RuralandAgriculturalBasicInformation";
import {
  addRequestType,
  getRequestType,
  updateRequestType,
  deleteRequestType,
  messageType
} from "@/types/request";

export type RuralInfrastructure1Res = {
  count: number;
  data: RuralInfrastructure1Type[];
};
export type GrossIndicesgross3Res = {
  count: number;
  data: GrossIndicesgross3Type[];
};
export type GrossOutputCompoosition4Res = {
  count: number;
  data: GrossOutputCompoosition4Type[];
};

/*农村基层组织﹑户数、人口、从业人员 */
export const getGrassroots = (data: getRequestType) => {
  return http.request<RuralInfrastructure1Res>(
    "post",
    "/api/basicInfo/manger/grassrootsInfoByYears",
    {
      data
    }
  );
};
/*添加农村基层组织﹑户数、人口、从业人员 */
export const addGrassroots = (
  data: addRequestType<RuralInfrastructure1Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/addGrassroots",
    {
      data
    }
  );
};
/*修改基层组织﹑户数、人口、从业人员 */
export const updeteGrassroots = (
  data: updateRequestType<RuralInfrastructure1Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/updeteGrassroots",
    {
      data
    }
  );
};
/*删除基层组织﹑户数、人口、从业人员 */
export const deleteGrassroots = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/deleteGrassroots",
    {
      data
    }
  );
};

/*历年农林牧渔总产值及指数 */
export const getProductionValueInfo = (data: getRequestType) => {
  return http.request<GrossIndicesgross3Res>(
    "post",
    "/api/basicInfo/manger/productionValueInfoByYears",
    {
      data
    }
  );
};
/*添加历年农林牧渔总产值及指数 */
export const addProductionValue = (
  data: addRequestType<GrossIndicesgross3Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/addProductionValue",
    {
      data
    }
  );
};
/*修改历年农林牧渔总产值及指数 */
export const updeteProductionValue = (
  data: updateRequestType<GrossIndicesgross3Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/updeteProductionValue",
    {
      data
    }
  );
};
/*删除历年农林牧渔总产值及指数 */
export const deleteProductionValue = (data: deleteRequestType) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/deleteProductionValue",
    {
      data
    }
  );
};

/*农林牧渔业产值及构成 */
export const getProductionValueAndComposition = (data: getRequestType) => {
  return http.request<GrossOutputCompoosition4Res>(
    "post",
    "/api/basicInfo/manger/productionValueAndCompositionInfoByYears",
    {
      data
    }
  );
};

/*添加农林牧渔业产值及构成 */
export const addProductionValueAndComposition = (
  data: addRequestType<GrossOutputCompoosition4Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/addProductionValueAndComposition",
    {
      data
    }
  );
};

/*修改农林牧渔业产值及构成 */
export const updateProductionValueAndComposition = (
  data: updateRequestType<GrossOutputCompoosition4Type>
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/updateProductionValueAndComposition",
    {
      data
    }
  );
};
/*删除农林牧渔业产值及构成 */
export const deleteProductionValueAndComposition = (
  data: deleteRequestType
) => {
  return http.request<messageType>(
    "post",
    "/api/basicInfo/manger/deleteProductionValueAndComposition",
    {
      data
    }
  );
};
