import React, { SFC } from "react";
import "./HeroGrid.scss";
import { Hero, HeroRarity } from "../../interfaces";
import classNames from "classnames";
import { HERO_MAX_LEVEL } from "../../constants";
import { Stars, StarType } from "../Common/Star";

export interface HeroGridProps {
  items: Hero[];
}

const getStarType = (h: Hero) => {
  if (h.rarity === HeroRarity.N) {
    return StarType.Blue;
  } else if (h.rarity === HeroRarity.SP) {
    return StarType.Purple;
  } else {
    return h.awake > 0 ? StarType.Purple : StarType.Orange;
  }
};

const renderItem = (h: Hero) => {
  return (
    <div
      className={classNames(
        "hero-grid-item",
        `rarity-${h.rarity.toLowerCase()}`
      )}
      key={h.id}
      onClick={() => console.log(h)}
    >
      <img src={`/res/hero/${h.hero_id}.png`} />
      <div className="level">{h.level === HERO_MAX_LEVEL ? "满" : h.level}</div>
      <div className="star-level">
        <Stars type={getStarType(h)} level={h.star} />
      </div>
      {h.awake > 0 && <div className="awake">觉</div>}
    </div>
  );
};

export const HeroGrid: SFC<HeroGridProps> = props => {
  return (
    <div className="hero-grid">
      <div className="hero-grid-container">{props.items.map(renderItem)}</div>
    </div>
  );
};
