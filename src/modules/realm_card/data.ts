import { IRealmCardData } from "../../interfaces";

const DATA = require("./REALM_CARD_DATA.json");

export const RealmCardNames = [
  "太鼓",
  "斗鱼",
  "伞室内",
  "太阴符咒",
  "太阳符咒",
  "伞结界",
  "夜屏风",
  "白桃林",
  "胧车",
  "鬼火烧",
  "葫芦酒",
  "口水蛙",
  "孟婆汤",
  "绵绵冰",
  "千年笛",
  "神乐铃",
  "天雷鼓",
  "阎琵琶",
  "炼妖琴"
];

const DataMap: Map<number, IRealmCardData> = DATA.reduce(
  (m: Map<number, IRealmCardData>, i: any) => {
    m.set(i.id, i);
    return m;
  },
  new Map()
);

export const getRealmCardData = (itemId: number) => DataMap.get(itemId);
