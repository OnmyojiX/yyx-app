import { IHeroEquipSuitData } from "../../interfaces";

const DATA = require("./EQUIP_SUIT_DATA.json");

const DataMap: Map<number, IHeroEquipSuitData> = DATA.reduce(
  (m: Map<number, IHeroEquipSuitData>, i: any) => {
    m.set(i.id, i);
    return m;
  },
  new Map()
);

export const getEquipSuiteData = (id: number) => DataMap.get(id);
