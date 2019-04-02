import {
  HeroEquipAttrType,
  IHeroEquipSuitData,
  IHeroEquip
} from "../../interfaces";
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

const PercentageAttrs = [
  HeroEquipAttrType.HpRate,
  HeroEquipAttrType.DefenseRate,
  HeroEquipAttrType.AttackRate,
  HeroEquipAttrType.CritRate,
  HeroEquipAttrType.CritPower,
  HeroEquipAttrType.EffectHitRate,
  HeroEquipAttrType.EffectResistRate
];

export const HeroEquipPosAttrBaseTypes = new Map<number, HeroEquipAttrType[]>([
  [1, [HeroEquipAttrType.Attack]],
  [
    2,
    [
      HeroEquipAttrType.AttackRate,
      HeroEquipAttrType.DefenseRate,
      HeroEquipAttrType.HpRate,
      HeroEquipAttrType.Speed
    ]
  ],
  [3, [HeroEquipAttrType.Defense]],
  [
    4,
    [
      HeroEquipAttrType.AttackRate,
      HeroEquipAttrType.DefenseRate,
      HeroEquipAttrType.HpRate,
      HeroEquipAttrType.EffectHitRate,
      HeroEquipAttrType.EffectResistRate
    ]
  ],
  [5, [HeroEquipAttrType.Hp]],
  [
    6,
    [
      HeroEquipAttrType.AttackRate,
      HeroEquipAttrType.DefenseRate,
      HeroEquipAttrType.HpRate,
      HeroEquipAttrType.CritRate,
      HeroEquipAttrType.CritPower
    ]
  ]
]);

export const formatEquipAttrValue = (
  type: HeroEquipAttrType,
  value: number,
  plus?: boolean
) => {
  return (
    (plus && value ? "+" : "") +
    formatAttrValue(
      value,
      PercentageAttrs.includes(type)
        ? AttrValueType.Percentage
        : AttrValueType.Float
    )
  );
};

export const formatEquipAttr = (type: HeroEquipAttrType, value: number) => {
  return [
    AttrNames[type],
    formatAttrValue(
      value,
      PercentageAttrs.includes(type)
        ? AttrValueType.Percentage
        : AttrValueType.Float
    )
  ];
};

export const getEquipAttrName = (type: HeroEquipAttrType) => AttrNames[type];

export const getEquipSuitAttrName = (suit: IHeroEquipSuitData) => {
  const attr2 = suit.attr[1].length && suit.attr[1][0];
  return attr2 ? getEquipAttrName(attr2.type) : "单件属性";
};

export const getEquipRandomAttrValue = (
  equip: IHeroEquip,
  type: HeroEquipAttrType
) => {
  if (!equip.random_attr_map) {
    equip.random_attr_map = new Map(equip.random_attrs.map(attr => [
      attr.type,
      attr.value
    ]) as [HeroEquipAttrType, number][]);
  }
  return equip.random_attr_map.get(type) || null;
};
