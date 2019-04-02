import { IHeroEquip, HeroEquipAttrType, ISnapshot } from "../../interfaces";

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

const SuitMap: { [id: string]: string } = {
  "300002": "雪幽魂",
  "300003": "地藏像",
  "300004": "蝠翼",
  "300006": "涅槃之火",
  "300007": "三味",
  "300008": "魍魉之匣",
  "300009": "被服",
  "300010": "招财猫",
  "300011": "反枕",
  "300012": "轮入道",
  "300013": "日女巳时",
  "300014": "镜姬",
  "300015": "钟灵",
  "300018": "狰",
  "300019": "火灵",
  "300020": "鸣屋",
  "300021": "薙魂",
  "300022": "心眼",
  "300023": "木魅",
  "300024": "树妖",
  "300026": "网切",
  "300027": "阴摩罗",
  "300029": "伤魂鸟",
  "300030": "破势",
  "300031": "镇墓兽",
  "300032": "珍珠",
  "300033": "骰子鬼",
  "300034": "蚌精",
  "300035": "魅妖",
  "300036": "针女",
  "300039": "返魂香",
  "300048": "狂骨",
  "300049": "幽谷响",
  "300050": "土蜘蛛",
  "300051": "胧车",
  "300052": "荒骷髅",
  "300053": "地震鲶",
  "300054": "蜃气楼",
  "300073": "飞缘魔",
  "300074": "兵主部",
  "300075": "青女房",
  "300076": "涂佛"
};

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
