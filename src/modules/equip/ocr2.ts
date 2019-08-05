import {
  IHeroEquip,
  HeroEquipAttrType,
  ISnapshot,
  IHeroEquipSuitData
} from "../../interfaces";
const DATA = require("./EQUIP_SUIT_DATA.json");

export const ALL_SUIT_DATA: IHeroEquipSuitData[] = DATA;
export interface Ocr2Item {
  御魂ID: string;
  御魂等级: number;
  御魂星级: number;
  御魂类型: string;
  位置: number;
  生命?: number;
  防御?: number;
  攻击?: number;
  生命加成?: number;
  防御加成?: number;
  攻击加成?: number;
  速度?: number;
  暴击?: number;
  暴击伤害?: number;
  效果命中?: number;
  效果抵抗?: number;
}

const AttrNameMap = {
  Hp: "生命",
  Defense: "防御",
  Attack: "攻击",
  HpRate: "生命加成",
  DefenseRate: "防御加成",
  AttackRate: "攻击加成",
  Speed: "速度",
  CritRate: "暴击",
  CritPower: "暴击伤害",
  EffectHitRate: "效果命中",
  EffectResistRate: "效果抵抗"
};

const SuitMap: { [id: string]: string } = ALL_SUIT_DATA.reduce(
  (map, i) => {
    map[String(i.id)] = i.name;
    return map;
  },
  {} as { [id: string]: string }
);

export function equipsToOcr2(
  equips: IHeroEquip[]
): ("yuhun_ocr2.0" | Ocr2Item)[] {
  const items = equips.map(equip => {
    const item = {
      御魂ID: equip.id,
      御魂等级: equip.level,
      御魂星级: equip.quality,
      御魂类型: SuitMap[String(equip.suit_id)],
      位置: equip.pos + 1
    };
    const attrMap: { [key: string]: number } = {};
    for (let attr of [equip.base_attr, ...equip.attrs, ...equip.single_attrs]) {
      const v = attrMap[attr.type] || 0;
      attrMap[attr.type] = v + attr.value;
    }
    Object.keys(attrMap).forEach(k => {
      (item as any)[(AttrNameMap as any)[k] as any] = attrMap[k];
    });
    return item;
  });
  return ["yuhun_ocr2.0", ...items];
}

export function snapshotToOcr2(
  shanpshot: ISnapshot
): ("yuhun_ocr2.0" | Ocr2Item)[] {
  return equipsToOcr2(shanpshot.data.hero_equips);
}
