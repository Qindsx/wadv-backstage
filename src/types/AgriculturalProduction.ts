// 7
export interface TreeSownOutputPerHectareDataType {
  agriculturalProductName: string;
  children?: any[];
  id: string;
  name: string;
  parentName: string;
  value: number;
}
export interface TreeSownOutputPerHectareType {
  data: TreeSownOutputPerHectareDataType[];
  year: string;
}

export interface SownOutputPerHectareType {
  autumnGrainCrops: string;
  corn: string;
  cotton: string;
  doubleRotationRice: string;
  earlySeasonRice: string;
  fiberCrops: string;
  grainCrops: string;
  herbCrops: string;
  melons: string;
  midSeasonRice: string;
  oilBerain: string;
  otherCerealsAutumn: string;
  otherCerealsSummer: string;
  paddyRice: string;
  peanuts: string;
  rapeSeeds: string;
  sesame: string;
  soybeanAutumn: string;
  soybeanSummer: string;
  sugarCrops: string;
  summerGrainCrops: string;
  tobacco: string;
  tuberCropsAutumn: string;
  tuberCropsSummer: string;
  vagetable: string;
  wheat: string;
  classify?: string;
  year?: string;
}

export interface ForestryProductionType {
  bamboo: string;
  bambooTimberHarvesting: string;
  barrenMountain: string;
  blackFungus: string;
  chineseChestnut: string;
  chineseGall: string;
  chineseSapiumSeed: string;
  forestAfforestation: string;
  forestTendingArea: string;
  mushroom: string;
  nanBamboo: string;
  oilTeaCamelliaSeed: string;
  reforestationArea: string;
  scatteredTreePlanging: string;
  seedlingArea: string;
  seedlingYield: string;
  seedsTungOilTree: string;
  sundryBamboo: string;
  timber: string;
  whiteFungus: string;
  year?: string;
}

export interface AnimalHusbandryProductionType {
  yearendStockAnimals: string;
  cowsBreed: string;
  beefCattle: string;
  horses: string;
  donkeys: string;
  mutes: string;
  yearendSheep: string;
  yearendHogs: string;
  femalHogs: string;
  slaughteredFattenedHogs: string;
  slaughteredCattle: string;
  slaughteredSheep: string;
  slaughteredPoultry: string;
  milk: string;
  honey: string;
  eggs: string;
}
export interface FisheryProductionType {
  shrimpsCultured?: string;
  shrimpsCaught: string;
  freshCulturedArea: string;
  aquaticProducts: string;
  shrimpsArtificially: string;
  fishCaught: string;
  otherCaught: string;
  fishArtificiallyAll: string;
  fishArtificially: string;
  fishCaughtAll: string;
  otherArtificially: string;
  fishCultured: string;
  fishCulturedAll: string;
  otherCultured: string;
  shellfhshArtificially: string;
  paddyCulturedArea: string;
  proliferationArtificiallyArea: string;
  shellfhshCaught: string;
  shellfhshCultured: string;
}
export interface TeaFruitProductionType {
  fruitOutputAll: string;
  greenTea: string;
  otherTea: string;
  kiwiFruit: string;
  citrus: string;
  grapes: string;
  whiteTea: string;
  citrusArea: string;
  kiwiArea: string;
  peachsArea: string;
  grapesArea: string;
  peaches: string;
  pearsArea: string;
  pears: string;
  pickedArea: string;
  persimmons: string;
  teaOutputAll: string;
  teaPlantationArea: string;
  wulongTea: string;
  yearendOrchardArea: string;
}
export interface ProductionOfOtherProductsType
  extends AnimalHusbandryProductionType,
    FisheryProductionType,
    TeaFruitProductionType {
  year?: string;
}
