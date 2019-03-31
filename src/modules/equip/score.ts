import { HeroEquipAttrType, IHeroEquip } from "../../interfaces";
import { getEquipRandomAttrValue } from "./attr";

// http://nga.178.com/read.php?tid=15853326

export interface IScoreData {
  score: number;
  attrs: [HeroEquipAttrType, number][];
}

const round0 = (v: number) => Math.round(v);
const round2 = (v: number) => Math.round(v * 100) / 100;

const AttrValueRounders: Map<
  HeroEquipAttrType,
  (v: number) => number
> = new Map([
  [HeroEquipAttrType.Speed, round0],
  [HeroEquipAttrType.AttackRate, round2],
  [HeroEquipAttrType.CritRate, round2],
  [HeroEquipAttrType.CritPower, round2],
  [HeroEquipAttrType.EffectHitRate, round2],
  [HeroEquipAttrType.EffectResistRate, round2]
]);

const SCORE_DATA: IScoreData[] = [];

const match = (equip: IHeroEquip, data: IScoreData) => {
  if (equip.random_attrs.length < data.attrs.length) {
    return false;
  }

  for (let [reqType, reqValue] of data.attrs) {
    const round = AttrValueRounders.get(reqType);
    let value = getEquipRandomAttrValue(equip, reqType);
    if (!value) {
      return false;
    }
    if (round) {
      value = round(value);
    }
    if (value < reqValue) {
      return false;
    }
  }

  return true;
};

/*
为了给大家更直观理解3分、5分御魂的概念，做了一些举例，其中(1~3)代表着后续说的是3个御魂，为了简便起见，合并成一行展示，御魂之间用分号“；”隔开了。。(7)、(8)这些就是指的单个御魂：
*/

/*
3分御魂：
*/

// (1~3)速度+8；暴击+8；攻击加成+8

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.Speed, 8]]
});

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.CritRate, 0.08]]
});

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.AttackRate, 0.08]]
});

// (4~6)暴击伤害+11；效果命中+11；效果抵抗+11

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.CritPower, 0.11]]
});

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.EffectHitRate, 0.11]]
});

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.EffectResistRate, 0.11]]
});

// (7)速度+3 & 暴击+3 & 暴击伤害+4

SCORE_DATA.push({
  score: 3,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.04]
  ]
});

// (8)速度+3 & 暴击+6

SCORE_DATA.push({
  score: 3,
  attrs: [[HeroEquipAttrType.Speed, 3], [HeroEquipAttrType.CritRate, 0.06]]
});

/*
4分御魂
*/

// (1~3)速度+11；暴击+11；攻击加成+11；
SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.Speed, 11]]
});

SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.CritRate, 0.11]]
});

SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.AttackRate, 0.11]]
});

// (4~6)暴击伤害+14；效果命中+14；效果抵抗+14；
SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.CritPower, 0.14]]
});

SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.EffectHitRate, 0.14]]
});

SCORE_DATA.push({
  score: 4,
  attrs: [[HeroEquipAttrType.EffectResistRate, 0.14]]
});

// (7)速度+3 & 暴击+3 & 暴击伤害+7
SCORE_DATA.push({
  score: 4,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.07]
  ]
});

// (8)攻击加成+3 & 速度+3 & 暴击伤害+7
SCORE_DATA.push({
  score: 4,
  attrs: [
    [HeroEquipAttrType.AttackRate, 0.03],
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritPower, 0.07]
  ]
});

/*
5分御魂：
*/

// (1~3)速度+13；暴击+13；攻击加成+13； (相信对于绝大多数人而言，这样的御魂已经算是“好御魂”了)
SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.Speed, 13]]
});

SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.CritRate, 0.13]]
});

SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.AttackRate, 0.13]]
});

// (4~6)暴击伤害+18；效果命中+18；效果抵抗+18；

SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.CritPower, 0.18]]
});

SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.EffectHitRate, 0.18]]
});

SCORE_DATA.push({
  score: 5,
  attrs: [[HeroEquipAttrType.EffectResistRate, 0.18]]
});

// (7)速度+8 & 效果命中+4 & 效果抵抗+4

SCORE_DATA.push({
  score: 5,
  attrs: [
    [HeroEquipAttrType.Speed, 8],
    [HeroEquipAttrType.EffectHitRate, 0.04],
    [HeroEquipAttrType.EffectResistRate, 0.04]
  ]
});

// (8)速度+3 & 效果命中+7 & 效果抵抗+7 (这个御魂，可能在人心目中就是“平平无奇”)

SCORE_DATA.push({
  score: 5,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.EffectHitRate, 0.07],
    [HeroEquipAttrType.EffectResistRate, 0.07]
  ]
});

/*
6分御魂
*/

// (1~3)速度+16；暴击+16；攻击加成+16 (准“极品”御魂，速度类顶级御魂)

SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.Speed, 16]]
});

SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.CritRate, 0.16]]
});

SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.AttackRate, 0.16]]
});

// (4~6)暴击伤害+22；效果命中+22；效果抵抗+22
SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.CritPower, 0.22]]
});

SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.EffectHitRate, 0.22]]
});

SCORE_DATA.push({
  score: 6,
  attrs: [[HeroEquipAttrType.EffectResistRate, 0.22]]
});

// (7)速度+8 & 效果命中+7 & 效果抵抗4
SCORE_DATA.push({
  score: 6,
  attrs: [
    [HeroEquipAttrType.Speed, 8],
    [HeroEquipAttrType.EffectHitRate, 0.07],
    [HeroEquipAttrType.EffectResistRate, 0.04]
  ]
});

// (8)速度+3 & 效果命中+7 & 效果抵抗+11

SCORE_DATA.push({
  score: 6,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.EffectHitRate, 0.07],
    [HeroEquipAttrType.EffectResistRate, 0.11]
  ]
});

/*
7分御魂
*/

// (1)速度+16 & 暴击+3

SCORE_DATA.push({
  score: 7,
  attrs: [[HeroEquipAttrType.Speed, 16], [HeroEquipAttrType.CritRate, 0.03]]
});

// (2)速度+3 & 效果命中+22 (纯命中类顶级御魂)

SCORE_DATA.push({
  score: 7,
  attrs: [[HeroEquipAttrType.Speed, 3], [HeroEquipAttrType.EffectHitRate, 0.22]]
});

// (3)速度+3 & 攻击加成+11 & 暴击+5

SCORE_DATA.push({
  score: 7,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.AttackRate, 0.11],
    [HeroEquipAttrType.CritRate, 0.05]
  ]
});

// (4)速度+3 & 效果命中+11 & 效果抵抗+11

SCORE_DATA.push({
  score: 7,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.EffectHitRate, 0.11],
    [HeroEquipAttrType.EffectResistRate, 0.11]
  ]
});

/*
8分御魂
*/

// (1)速度+16 & 暴击+3 & 攻击加成+3

SCORE_DATA.push({
  score: 8,
  attrs: [
    [HeroEquipAttrType.Speed, 16],
    [HeroEquipAttrType.CritRate, 0.03],
    [HeroEquipAttrType.AttackRate, 0.03]
  ]
});

// (2)速度+8 & 效果命中+7 & 效果抵抗+11 (双堆类顶级御魂1)

SCORE_DATA.push({
  score: 8,
  attrs: [
    [HeroEquipAttrType.Speed, 8],
    [HeroEquipAttrType.EffectHitRate, 0.07],
    [HeroEquipAttrType.EffectResistRate, 0.11]
  ]
});

// (3)速度+3 & 效果命中+11 & 效果抵抗+14 (双堆类顶级御魂2)

SCORE_DATA.push({
  score: 8,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.EffectHitRate, 0.11],
    [HeroEquipAttrType.EffectResistRate, 0.14]
  ]
});

// (4)速度+3 & 暴击+11 & 暴击伤害+11

SCORE_DATA.push({
  score: 8,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.11],
    [HeroEquipAttrType.CritPower, 0.11]
  ]
});

/*
9分御魂

(3)速度+8 & 暴击+3 & 攻击加成+8 & 暴击伤害+11 (输出类满分御魂)
*/

SCORE_DATA.push({
  score: 9,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.16],
    [HeroEquipAttrType.AttackRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.04]
  ]
});

// (2)速度+3 & 暴击+11 & 攻击加成+3 & 暴击伤害+11(输出类顶级御魂2)

SCORE_DATA.push({
  score: 9,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.11],
    [HeroEquipAttrType.AttackRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.11]
  ]
});

// (2)速度+3 & 暴击+8 & 攻击加成+3 & 暴击伤害+14(输出类顶级御魂3)

SCORE_DATA.push({
  score: 9,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.08],
    [HeroEquipAttrType.AttackRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.14]
  ]
});

// (1)速度+3 & 暴击+16 & 攻击加成+3 & 暴击伤害+4 (输出类顶级御魂1)

SCORE_DATA.push({
  score: 9,
  attrs: [
    [HeroEquipAttrType.Speed, 3],
    [HeroEquipAttrType.CritRate, 0.16],
    [HeroEquipAttrType.AttackRate, 0.03],
    [HeroEquipAttrType.CritPower, 0.04]
  ]
});

SCORE_DATA.sort((a, b) => b.score - a.score);

export function getEquipScoreData(equip: IHeroEquip): IScoreData | null {
  for (let item of SCORE_DATA) {
    if (match(equip, item)) {
      return item;
    }
  }
  return null;
}
