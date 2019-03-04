import React, { SFC, useState } from "react";
import "./HeroPage.scss";
import { connect } from "react-redux";
import { IHero } from "../../interfaces";
import { IYyxState } from "../../store";
import { HeroGrid } from "./HeroGrid";
import { HeroDetailOverlay } from "./HeroDetailOverlay";
import { HeroSelectors } from "../../modules/hero";

const Render: SFC<{
  heroes: IHero[] | null;
}> = props => {
  const [activeHero, setActiveHero] = useState<IHero | null>(null);

  if (!props.heroes) {
    return null;
  }

  return (
    <>
      <HeroDetailOverlay
        hero={activeHero}
        onClose={() => setActiveHero(null)}
      />
      <HeroGrid
        items={props.heroes}
        onClickHero={hero => setActiveHero(hero)}
      />
    </>
  );
};

export const HeroPage = connect((state: IYyxState) => ({
  heroes: HeroSelectors.selectAllSorted(state)
}))(Render);
