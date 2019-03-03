import React, { SFC } from "react";
import "./HeroIcon.scss";
import { IHero, HeroRarity } from "../../interfaces";
import classNames from "classnames";
import { HERO_MAX_LEVEL } from "../../constants";
import { Stars, StarType } from "../Common/Star";

const getStarType = (h: IHero) => {
  if (h.rarity === HeroRarity.N) {
    return StarType.Blue;
  } else if (h.rarity === HeroRarity.SP) {
    return StarType.Purple;
  } else {
    return h.awake > 0 ? StarType.Purple : StarType.Orange;
  }
};

export const HeroIcon: SFC<{
  hero: IHero;
  className?: string;
  onClickHero?: (hero: IHero) => void;
}> = props => {
  const h = props.hero;
  return (
    <div
      className={classNames(
        "hero-icon",
        `rarity-${h.rarity.toLowerCase()}`,
        props.onClickHero && "clickable",
        props.className
      )}
      key={h.id}
      onClick={() => props.onClickHero && props.onClickHero(h)}
    >
      <img className={props.className} src={`/res/hero/${h.hero_id}.png`} />
      <div className="level">{h.level === HERO_MAX_LEVEL ? "满" : h.level}</div>
      <div className="star-level">
        <Stars type={getStarType(h)} level={h.star} />
      </div>
      {h.awake > 0 && <div className="awake">觉</div>}
    </div>
  );
};
