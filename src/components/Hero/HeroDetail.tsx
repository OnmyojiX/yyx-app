import React, { SFC } from "react";
import "./HeroDetail.scss";
import {
  IHero,
  IHeroAttrRating,
  IHeroAttrs,
  IHeroAttr
} from "../../interfaces";
import { HeroIcon } from "./HeroIcon";
import { Rarity } from "../Common/Rarity";
import classNames from "classnames";
import { Rating } from "../Common/Rating";
import { AttrValueType, formatAttrValue } from "../../utils";
import { Divider } from "@blueprintjs/core";

const renderIconName = (hero: IHero) => (
  <div className="icon-name yyx-layout row">
    <div className="icon item">
      <HeroIcon hero={hero} />
    </div>
    <div className="name item yyx-layout column">
      <div className="yyx-layout row yyx-space-v">
        <Rarity rarity={hero.rarity} className="item" />
        <div className="item hero" style={{ flex: "0 0 auto" }}>
          {hero.data && hero.data.name}
        </div>
      </div>
      {hero.nick_name && <div>昵称: {hero.nick_name}</div>}
    </div>
  </div>
);

const attrs: Array<[string, string, string, AttrValueType]> = [
  ["attack", "攻击", "attack", AttrValueType.Float],
  ["max_hp", "生命", "max-hp", AttrValueType.Float],
  ["defense", "防御", "defense", AttrValueType.Float],
  ["speed", "速度", "speed", AttrValueType.Float],
  ["crit_rate", "暴击", "crit-rate", AttrValueType.Percentage]
];

const renderAttrs = (hero: IHero, ratings: IHeroAttrRating) => (
  <div className="attrs yyx-layout column">
    {attrs.map(([key, label, className, type]) => {
      const attr = hero.attrs[key as keyof IHeroAttrs] as IHeroAttr;
      return (
        <div key={key} className="yyx-layout row">
          <i className={classNames("attr-icon item yyx-space-h", className)} />
          <span className="item rating">
            <Rating rating={ratings[key as keyof IHeroAttrRating]} />
          </span>
          <span className="item label">{label}</span>
          <span className="item attr-value">
            {formatAttrValue(attr.base, type)}
            {attr.value > attr.base && (
              <span className="plus-value">
                +{formatAttrValue(attr.value - attr.base, type)}
              </span>
            )}
          </span>
        </div>
      );
    })}
    <div className="yyx-layout row">
      <span className="item label">暴击伤害</span>
      <span className="item attr-value">
        {formatAttrValue(
          1 + hero.attrs.crit_power.value,
          AttrValueType.Percentage
        )}
      </span>
    </div>
    <div className="yyx-layout row">
      <span className="item label">效果命中</span>
      <span className="item attr-value">
        {formatAttrValue(
          1 + hero.attrs.effect_hit_rate - 1,
          AttrValueType.Percentage
        )}
      </span>
    </div>
    <div className="yyx-layout row yyx-space-v">
      <span className="item label">效果抵抗</span>
      <span className="item attr-value">
        {formatAttrValue(
          1 + hero.attrs.effect_resist_rate - 1,
          AttrValueType.Percentage
        )}
      </span>
    </div>
    <div className="yyx-layout row">
      <span className="item label">攻击 x 暴伤</span>
      <span className="item attr-value">
        {formatAttrValue(
          hero.attrs.attack.value * (1 + hero.attrs.crit_power.value)
        )}
      </span>
    </div>
    <div className="yyx-layout row">
      <span className="item label">生命 x 暴伤</span>
      <span className="item attr-value">
        {formatAttrValue(
          hero.attrs.max_hp.value * (1 + hero.attrs.crit_power.value)
        )}
      </span>
    </div>
  </div>
);

export const HeroDetail: SFC<{
  hero: IHero;
}> = props => {
  const { hero } = props;

  if (!hero.data) {
    return null;
  }

  const ratings =
    hero.awake > 0
      ? hero.data.attr_rating.awake
      : hero.data.attr_rating.unawake;

  return (
    <div className="hero-detail">
      {renderIconName(hero)}
      {renderAttrs(hero, ratings)}
    </div>
  );
};
