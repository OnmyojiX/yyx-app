import React, { SFC } from "react";
import "./EquipGrid.scss";
import { IHeroEquip } from "../../interfaces";
import { EquipItem } from "./EquipItem";

export interface EquipGridProps {
  items: IHeroEquip[];
  onClickEquip?: (equip: IHeroEquip) => void;
}

export const EquipGrid: SFC<EquipGridProps> = props => {
  return (
    <div className="hero-equip-grid">
      <div className="hero-equip-grid-container">
        {props.items.map(i => (
          <EquipItem
            key={i.id}
            className="hero-equip-grid-item"
            equip={i}
            onClickEquip={props.onClickEquip}
          />
        ))}
      </div>
    </div>
  );
};
