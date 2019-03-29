import React, { SFC } from "react";
import "./HeroIcon.scss";
import { IHero, HeroRarity, IHeroData } from "../../interfaces";
import classNames from "classnames";
import { HERO_MAX_LEVEL } from "../../constants";
import { Stars, StarType } from "../Common/Star";

const getStarType = (h: { rarity: HeroRarity; awake: number }) => {
  if (h.rarity === HeroRarity.N) {
    return StarType.Blue;
  } else if (h.rarity === HeroRarity.SP) {
    return StarType.Purple;
  } else {
    return h.awake > 0 ? StarType.Purple : StarType.Orange;
  }
};

export interface IHeroIconItem {
  id?: string;
  hero_id: number;
  level: number;
  star: number;
  rarity: HeroRarity;
  awake: number;
}

export const HeroIcon: SFC<{
  hero: IHeroIconItem;
  className?: string;
  onClickHero?: (item: IHeroIconItem) => void;
  childHeros?: IHero[];
}> = props => {
  const h = props.hero;
  return (
    <div
      className={classNames(
        "hero-icon",
        `rarity-${h.rarity.toLowerCase()}`,
        !props.childHeros && props.onClickHero && "clickable",
        props.className
      )}
      key={h.id}
      onClick={() => props.onClickHero && props.onClickHero(h)}
    >
      <img src={`/res/hero/${h.hero_id}.png`} />
      <div className="level">{h.level === HERO_MAX_LEVEL ? "满" : h.level}</div>
      {props.childHeros && (
        <div className="children-count">
          <span>{props.childHeros.length}</span>
        </div>
      )}
      <div className="star-level">
        <Stars type={getStarType(h)} level={h.star} />
      </div>
      {h.awake > 0 && <div className="awake">觉</div>}
    </div>
  );
};

export const HeroDataIcon: SFC<{
  data: IHeroData;
  className?: string;
}> = props => {
  return (
    <div
      className={classNames(
        "hero-icon",
        `rarity-${props.data.rarity.toLowerCase()}`,
        props.className
      )}
      key={props.data.id}
    >
      <img src={`/res/hero/${props.data.id}.png`} />
      <div className="name">{props.data.name}</div>
    </div>
  );
};
