import { IHeroEquipSuitData } from "../../interfaces";

const DATA = require("./EQUIP_SUIT_DATA.json");

export const ALL_SUIT_DATA: IHeroEquipSuitData[] = DATA;

const DataMap: Map<number, IHeroEquipSuitData> = ALL_SUIT_DATA.reduce(
  (m: Map<number, IHeroEquipSuitData>, i: any) => {
    m.set(i.id, i);
    return m;
  },
  new Map()
);

export const getEquipSuiteData = (id: number) => DataMap.get(id);
