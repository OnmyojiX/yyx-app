import { number } from "prop-types";
import { NonIdealState } from "@blueprintjs/core";

export interface IPlayer {
  id: number;
  server_id: number;
  name: string;
  level: string;
}

export interface IPlayerCurrency {
  coin: number;
  jade: number;
  action_point: number;
  auto_point: number;
  honor: number;
  medal: number;
  contrib: number;
  totem_pass: number;
  s_jade: number;
  skin_token: number;
  realm_raid_pass: number;
}

export interface IHero {
  id: string;
  hero_id: number;
  equips: string[];
  level: number;
  awake: number;
  star: number;
  exp: number;
  exp_rate: number;
  nick_name: string;
  born: number;
  lock: boolean;
  rarity: HeroRarity;
  skills: HeroSkill[];
  attrs: IHeroAttrs;
  data?: IHeroData;
  timestamp_from_id?: number;
}

export interface IHeroAttrs {
  max_hp: IHeroAttr;
  speed: IHeroAttr;
  crit_power: IHeroAttr;
  crit_rate: IHeroAttr;
  defense: IHeroAttr;
  attack: IHeroAttr;
  effect_hit_rate: number;
  effect_resist_rate: number;
}

export interface IHeroAttr {
  base: number;
  add_value: number;
  add_rate: number;
  value: number;
}

export interface IHeroData {
  id: number;
  name: string;
  attr_rating: {
    unawake: IHeroAttrRating;
    awake: IHeroAttrRating;
  };
  rarity: HeroRarity;
  skills: number[];
  awake_skill: number | null;
  awake_base_attrs: { [level: string]: IHeroAttrs };
}

export enum Ratings {
  SS = "ss",
  S = "s",
  A = "a",
  B = "b",
  C = "c",
  D = "d"
}

export interface IHeroAttrRating {
  attack: Ratings;
  max_hp: Ratings;
  defense: Ratings;
  speed: Ratings;
  crit_rate: Ratings;
}

export enum HeroRarity {
  N = "N",
  R = "R",
  SR = "SR",
  SSR = "SSR",
  SP = "SP"
}

export interface HeroSkill {
  id: number;
  level: number;
}

export interface IHeroEquip {
  id: string;
  suit_id: number;
  quality: number;
  pos: number;
  equip_id: number;
  level: number;
  born: number;
  lock: boolean;
  garbage: boolean;
  // deprecated: 0.9.0
  // attrs: IHeroEquipAttr[];
  base_attr: IHeroEquipAttr;
  random_attrs: IHeroEquipAttr[];
  random_attr_rates: IHeroEquipAttr[];
  single_attrs: IHeroEquipAttr[];
  suit_data?: IHeroEquipSuitData;
  equipped_by?: IHero;
  included_in_presets?: IHeroEquipPreset[];
  timestamp_from_id?: number;
  random_attr_map?: Map<HeroEquipAttrType, number>;
}

export interface IHeroEquipSuitData {
  id: number;
  name: string;
  attr: [
    IHeroEquipSuiteAttr[],
    IHeroEquipSuiteAttr[],
    IHeroEquipSuiteAttr[],
    IHeroEquipSuiteAttr[]
  ];
  effect: [string[], string[], string[], string[]];
}

export interface IHeroEquipSuiteAttr {
  type: HeroEquipAttrType;
  value: number;
}

export interface IHeroEquipAttr {
  type: HeroEquipAttrType;
  value: number;
}

export enum HeroEquipAttrType {
  Hp = "Hp",
  Defense = "Defense",
  Attack = "Attack",
  HpRate = "HpRate",
  DefenseRate = "DefenseRate",
  AttackRate = "AttackRate",
  Speed = "Speed",
  CritRate = "CritRate",
  CritPower = "CritPower",
  EffectHitRate = "EffectHitRate",
  EffectResistRate = "EffectResistRate"
}

export interface IHeroEquipPreset {
  name: string;
  items: string[];
}

export interface IHeroBookShard {
  hero_id: number;
  shards: number;
  books: number;
  book_max_shards: number;
  hero_data?: IHeroData;
}

export interface IRealmCard {
  id: string;
  item_id: number;
  total_time: number;
  attrs: {
    exp: number;
    bonus: number;
  };
  data?: IRealmCardData;
}

export interface IRealmCardData {
  id: number;
  name: string;
  star: number;
}

export interface IStoryTask {
  id: number;
  progress: { value: number; max_value: number };
}

export interface IHeroStoryTaskData {
  hero_id: number;
  tasks: IStoryTaskData[];
}

export interface IStoryTaskData {
  id: number;
  achieve_type: number;
  cond_var: number;
  content: string;
}

export interface ISnapshot {
  version: string;
  timestamp: string;
  data: {
    player: IPlayer;
    currency: IPlayerCurrency;
    heroes: IHero[];
    hero_equips: IHeroEquip[];
    hero_equip_presets: IHeroEquipPreset[];
    hero_book_shards: IHeroBookShard[];
    realm_cards: IRealmCard[];
    story_tasks: IStoryTask[];
  };
  cbg_url: string | null;
}

export interface ICbgSnapshot {
  listing_info: {
    server_name: string;
    player_name: string;
    player_level: number;
    price: string;
    create_time: string;
  };
  snapshot: ISnapshot;
}
