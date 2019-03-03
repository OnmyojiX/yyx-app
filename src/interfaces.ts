export interface IPlayer {
  id: number;
  name: string;
  level: string;
}

export interface IPlayerCurrency {
  coin: number;
  jade: number;
  action_point: number;
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
  attrs: HeroEquipAttr[];
  base_attr: HeroEquipAttr;
  random_attrs: HeroEquipAttr[];
  random_attr_rates: HeroEquipAttr[];
}

export interface HeroEquipAttr {
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
  };
}
