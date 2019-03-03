import React, { SFC } from "react";
import "./Rarity.scss";
import classNames from "classnames";
import { HeroRarity } from "../../interfaces";

const ClassNames = {
  [HeroRarity.SP]: "sp",
  [HeroRarity.SSR]: "ssr",
  [HeroRarity.SR]: "sr",
  [HeroRarity.R]: "r",
  [HeroRarity.N]: "n"
};

export const Rarity: SFC<{
  rarity: HeroRarity;
  className?: string;
}> = props => {
  return (
    <i
      className={classNames(
        "rarity",
        `rarity-${ClassNames[props.rarity]}`,
        props.className
      )}
    />
  );
};
