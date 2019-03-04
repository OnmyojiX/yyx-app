import { HeroEquipAttrType } from "../../interfaces";
import { formatAttrValue, AttrValueType } from "../../utils";

const AttrNames = {
  [HeroEquipAttrType.Hp]: "生命",
  [HeroEquipAttrType.Defense]: "防御",
  [HeroEquipAttrType.Attack]: "攻击",
  [HeroEquipAttrType.HpRate]: "生命加成",
  [HeroEquipAttrType.DefenseRate]: "防御加成",
  [HeroEquipAttrType.AttackRate]: "攻击加成",
  [HeroEquipAttrType.Speed]: "速度",
  [HeroEquipAttrType.CritRate]: "暴击",
  [HeroEquipAttrType.CritPower]: "暴击伤害",
  [HeroEquipAttrType.EffectHitRate]: "效果命中",
  [HeroEquipAttrType.EffectResistRate]: "效果抵抗"
};

export const formatEquipAttr = (type: HeroEquipAttrType, value: number) => {
  return [
    AttrNames[type],
    formatAttrValue(
      value,
      type.includes("Rate") ? AttrValueType.Percentage : AttrValueType.Float
    )
  ];
};
