import { IHero, HeroRarity } from "../../interfaces";
import { composeSorters } from "../../utils";

const RarityRank = [
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

export const sortByRarity = (a: IHero, b: IHero) =>
  RarityRank[b.rarity] - RarityRank[a.rarity];
export const sortByHeroId = (a: IHero, b: IHero) => b.hero_id - a.hero_id;
export const sortByLevel = (a: IHero, b: IHero) => b.level - a.level;
export const sortByStar = (a: IHero, b: IHero) => b.star - a.star;
export const sortByAwake = (a: IHero, b: IHero) => b.awake - a.awake;
export const defaultSorter = composeSorters(
  sortByStar,
  sortByRarity,
  sortByAwake,
  sortByLevel,
  sortByHeroId
);
