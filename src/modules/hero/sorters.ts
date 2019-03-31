import { IHero, HeroRarity } from "../../interfaces";
import { combineSorters, sortDesc } from "../../utils";
import { RarityRank } from "./data";

export const sortByRarity = (a: IHero, b: IHero) =>
  RarityRank[b.rarity] - RarityRank[a.rarity];
export const sortByHeroId = (a: IHero, b: IHero) => a.hero_id - b.hero_id;
export const sortByLevel = (a: IHero, b: IHero) => a.level - b.level;
export const sortByStar = (a: IHero, b: IHero) => a.star - b.star;
export const sortByAwake = (a: IHero, b: IHero) => a.awake - b.awake;
export const defaultSorter = combineSorters(
  sortDesc(sortByStar),
  sortByRarity,
  sortDesc(sortByAwake),
  sortDesc(sortByLevel),
  sortDesc(sortByHeroId)
);
