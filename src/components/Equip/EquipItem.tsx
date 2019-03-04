import React, { SFC, useState } from "react";
import "./EquipItem.scss";
import { IHeroEquip } from "../../interfaces";
import classNames from "classnames";
import { Stars, StarType } from "../Common/Star";

export const EquipItem: SFC<{
  equip: IHeroEquip;
  className?: string;
  onClickEquip?: (equip: IHeroEquip) => void;
}> = props => {
  const { equip, className } = props;
  return (
    <div
      className={classNames(
        "hero-equip-item",
        className,
        props.onClickEquip && "clickable"
      )}
    >
      {equip.level > 0 && <label>+{equip.level}</label>}
      {equip.equipped_by && <div className="equipped">装备</div>}
      <div className="stars">
        <Stars type={StarType.Orange} level={equip.quality} />
      </div>
      <div className={classNames("icon", `pos-${equip.pos + 1}`)}>
        <img src={`/res/suit/${equip.suit_id}.png`} />
      </div>
    </div>
  );
};
