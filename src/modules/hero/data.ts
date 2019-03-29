import { IHeroAttrRating, IHeroData, HeroRarity } from "../../interfaces";

export const DATA = require("./HERO_DATA.json");

const mapAttrRating = (list: string[]) => {
  return {
    attack: list[0],
    max_hp: list[1],
    defense: list[2],
    speed: list[3],
    crit_rate: list[4]
  } as IHeroAttrRating;
};

export const ALL_HERO_DATA: IHeroData[] = DATA.map((i: any) => {
  return {
    id: i.id,
    name: i.name,
    attr_rating: {
      unawake: mapAttrRating(i.attr_rating[0]),
      awake: mapAttrRating(i.attr_rating[1])
    },
    rarity: i.rarity,
    skills: i.skills,
    awake_skill: i.awake_skill
  };
});

const DataMap: Map<number, IHeroData> = ALL_HERO_DATA.reduce(
  (m: Map<number, IHeroData>, i: any) => {
    m.set(i.id, i);
    return m;
  },
  new Map()
);

export const RarityRank = [
  HeroRarity.SP,
  HeroRarity.SSR,
  HeroRarity.SR,
  HeroRarity.R,
  HeroRarity.N
]
  .reverse()
  .reduce(
    (m, r, i) => {
      m[r] = i;
      return m;
    },
    {} as { [key in HeroRarity]: number }
  );

export const getHeroData = (heroId: number) => DataMap.get(heroId);
