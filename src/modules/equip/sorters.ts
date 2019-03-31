import { combineSorters, sortDesc } from "../../utils";
import { IHeroEquip } from "../../interfaces";

export const sortByQuality = (a: IHeroEquip, b: IHeroEquip) =>
  a.quality - b.quality;
export const sortByLevel = (a: IHeroEquip, b: IHeroEquip) => a.level - b.level;
export const sortBySuit = (a: IHeroEquip, b: IHeroEquip) =>
  a.suit_id - b.suit_id;

export const defaultSorter = combineSorters(
  sortDesc(sortByQuality),
  sortDesc(sortByLevel),
  sortBySuit
);
