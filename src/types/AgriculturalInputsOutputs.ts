export interface AgriculturalInvestmentType {
  effectiveIrrigationArea: string;
  electricityRuralArea: string;
  pumpedIrrigationArea: string;
  floodDroughtArea: string;
  nitrogenousFertilizer: string;
  phosphateFertilizer: string;
  potashFertilizer: string;
  mulchFilm: string;
  mulchFilmArea: string;
  comsumptionPesticide: string;
  agriculturalDieselOil: string;
  compoundFertilizer: string;
}
export interface AgricultureMechanizationType {
  combine: string;
  combinePower: string;
  dieselEngines: string;
  gasolineEngines: string;
  largeMachinery: string;
  largePower: string;
  largeTractors: string;
  miniMachinery: string;
  miniPowers: string;
  miniTractors: string;
  motorizedThresher: string;
  pumps: string;
}

export interface RroductionConditionsAndInputsDatum
  extends AgricultureMechanizationType,
    AgriculturalInvestmentType {
  year?: string;
}

export interface CategoryValueType {
  farming: string;
  forestry: string;
  animalHusbandry: string;
  industrialService: string;
  fishery: string;
}

export interface FarmingCategoryValueType {
  beans: string;
  cereal: string;
  cotton: string;
  fiberCrops: string;
  flower: string;
  herbCrops: string;
  oilCrops: string;
  otherCrops: string;
  sugarCrops: string;
  teaFruit: string;
  tobacco: string;
  tuberCrops: string;
  vagetable: string;
  wildPlants: string;
}

export interface CategoryOutputValueDatum
  extends CategoryValueType,
    FarmingCategoryValueType {
  year?: string;
}

export interface AgriculturalProductionDatum {
  aquaticProducts: string;
  cotton: string;
  eggs: string;
  fruit: string;
  grains: string;
  milk: string;
  oilBearing: string;
  slaughteredHogs: string;
  slaughteredPoultry: string;
  vagetables: string;
  year?: string;
}
