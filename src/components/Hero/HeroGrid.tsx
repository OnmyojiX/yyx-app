import React, { SFC } from "react";
import "./HeroGrid.scss";
import { IHero, HeroRarity } from "../../interfaces";
import classNames from "classnames";
import { HERO_MAX_LEVEL } from "../../constants";
import { Stars, StarType } from "../Common/Star";
import { HeroIcon } from "./HeroIcon";

export interface HeroGridProps {
  items: IHero[];
  onClickHero: (hero: IHero) => void;
}

export const HeroGrid: SFC<HeroGridProps> = props => {
  return (
    <div className="hero-grid">
      <div className="hero-grid-container">
        {props.items.map(i => (
          <HeroIcon
            key={i.id}
            className="hero-grid-item"
            hero={i}
            onClickHero={props.onClickHero}
          />
        ))}
      </div>
    </div>
  );
};
