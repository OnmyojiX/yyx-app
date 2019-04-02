import React, { SFC, useState } from "react";
import "./EquipItem.scss";
import { IHeroEquip } from "../../interfaces";
import classNames from "classnames";
import { Stars, StarType } from "../Common/Star";
import { Popover, Classes } from "@blueprintjs/core";
import { EquipDetail } from "./EquipDetail";

export const EquipItem: SFC<{
  equip: IHeroEquip;
  className?: string;
  minimal?: boolean;
  onClickEquip?: (equip: IHeroEquip) => void;
}> = props => {
  const { equip, className } = props;
  return (
    <Popover
      content={<EquipDetail equip={equip} />}
      minimal
      popoverClassName={classNames(Classes.POPOVER_CONTENT_SIZING)}
      portalClassName="hero-equip-item-popover"
    >
      <div
        className={classNames(
          "hero-equip-item",
          props.onClickEquip && "clickable",
          equip.garbage && "trashed",
          props.minimal && "minimal",
          className
        )}
        onClick={() => props.onClickEquip && props.onClickEquip(equip)}
      >
        {equip.level > 0 && <label>+{equip.level}</label>}
        {equip.equipped_by && <div className="equipped">装备</div>}
        <div className="stars">
          <Stars type={StarType.Orange} level={equip.quality} />
        </div>
        <div className={classNames("icon", `pos-${equip.pos + 1}`)}>
          <img src={`/static/res/suit/${equip.suit_id}.png`} />
        </div>
      </div>
    </Popover>
  );
};
