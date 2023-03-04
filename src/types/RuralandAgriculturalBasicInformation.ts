
export interface RuralInfrastructure1Type {
  /**
   * 农业从业人员(万人)
   */
  agriculturalLaborers: string;
  /**
   * 农林牧渔(万人)
   */
  agricultureEmployees: string;
  /**
   * 非农业从业人员(万人)
   */
  noAgriculturalLaborers: string;
  /**
   * 非农从业人员(万人)
   */
  noAgricultureEmployees: string;
  /**
   * 村委会(个)
   */
  subdistrictOff: string;
  /**
   * 办事处(个)
   */
  townGov: string;
  /**
   * 乡政府（个）
   */
  townshipGov: string;
  /**
   * 村民小组(个)
   */
  villagersCom: string;
  /**
   * 村民小组(个)
   */
  villagersSub: string;
  /**
   * 通宽带村数(个)
   */
  villagesBroad: string;
  /**
   * 通宽带村数占全部村委会比重(%)
   */
  villagesPropBroad: string;
  /**
   * 通有线电视村数占全部村委会比重(%)
   */
  villagesPropTv: string;
  /**
   * 自来水受益村数占全部村委会比重(%)
   */
  villagesPropWater: string;
  /**
   * 通有线电视村数(个)
   */
  villagesTv: string;
  /**
   * 自来水受益村数(个)
   */
  villagesWater: string;
  /**
   * 年份
   */
  year?: string;
}


export interface GrossIndicesgross3Type {
  /**
   * 农林牧渔总产值
   */
  grossOutputValue: string;
  /**
   * 农业
   */
  indicesGrossFarming: string;
  /**
   * 渔业
   */
  indicesGrossFishery: string;
  /**
   * 林业
   */
  indicesGrossForestry: string;
  /**
   * 牧业
   */
  indicesGrossHusbandry: string;
  /**
   * 农林渔牧总产值指数
   */
  indicesGrossTotal: string;
  /**
   * 年份
   */
  year?: string;
}


export interface GrossOutputCompoosition4Type {
  /**
   * 农业
   */
  farming: string;
  /**
   * 渔业
   */
  fishery: string;
  /**
   * 林业
   */
  forestry: string;
  /**
   * 牧业
   */
  husbandry: string;
  /**
   * 农林牧渔服务业
   */
  industrialService: string;
  /**
   * 农林牧渔业总计
   */
  total: string;
  /**
   * 年份
   */
  year?: string;
}
