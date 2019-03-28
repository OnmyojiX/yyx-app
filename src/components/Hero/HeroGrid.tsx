import React, { SFC } from "react";
import "./HeroGrid.scss";
import { HeroIcon, IHeroIconItem } from "./HeroIcon";
import { IHero } from "../../interfaces";

export interface HeroGridProps {
  items: (IHeroIconItem & { heroes?: IHero[] })[];
  onClickHero: (item: IHeroIconItem) => void;
}

export const HeroGrid: SFC<HeroGridProps> = props => {
  return (
    <div className="hero-grid">
      <div className="hero-grid-container">
        {props.items.map((i, idx) =>
          i.heroes ? (
            <HeroIcon
              key={idx}
              className="hero-grid-item"
              hero={i}
              childHeros={i.heroes}
            />
          ) : (
            <HeroIcon
              key={idx}
              className="hero-grid-item"
              hero={i}
              onClickHero={props.onClickHero}
            />
          )
        )}
      </div>
    </div>
  );
};
