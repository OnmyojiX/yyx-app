import React, { SFC } from "react";
import "./EquipGrid.scss";
import { IHeroEquip } from "../../interfaces";
import classNames from "classnames";
import { HERO_MAX_LEVEL } from "../../constants";
import { Stars, StarType } from "../Common/Star";
import { EquipItem } from "./EquipItem";
import { Popover, Classes } from "@blueprintjs/core";
import { EquipDetail } from "./EquipDetail";

export interface EquipGridProps {
  items: IHeroEquip[];
  onClickEquip?: (equip: IHeroEquip) => void;
}

export const EquipGrid: SFC<EquipGridProps> = props => {
  return (
    <div className="hero-equip-grid">
      <div className="hero-equip-grid-container">
        {props.items.map(i => (
          <Popover
            key={i.id}
            content={<EquipDetail equip={i} />}
            minimal
            popoverClassName={classNames(Classes.POPOVER_CONTENT_SIZING)}
            portalClassName="hero-equip-grid-popover"
          >
            <EquipItem
              className="hero-equip-grid-item"
              equip={i}
              onClickEquip={props.onClickEquip}
            />
          </Popover>
        ))}
      </div>
    </div>
  );
};
