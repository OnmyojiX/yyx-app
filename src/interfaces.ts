export interface Player {
  id: number;
  name: string;
  level: string;
}

export interface PlayerCurrency {
  coin: number;
  jade: number;
  action_point: number;
}

export interface Hero {
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
