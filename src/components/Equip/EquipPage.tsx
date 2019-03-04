import React, { SFC, useState } from "react";
import "./EquipPage.scss";
import { connect } from "react-redux";
import { IHeroEquip } from "../../interfaces";
import { IYyxState } from "../../store";
import { EquipSelectors } from "../../modules/equip";
import { EquipGrid } from "./EquipGrid";

const Render: SFC<{
  equips: IHeroEquip[] | null;
}> = props => {
  const [activeEquip, setActiveEquip] = useState<IHeroEquip | null>(null);

  if (!props.equips) {
    return null;
  }

  return (
    <>
      <EquipGrid
        items={props.equips}
        onClickEquip={equip => setActiveEquip(equip)}
      />
    </>
  );
};

export const EquipPage = connect((state: IYyxState) => ({
  equips: EquipSelectors.selectDisplay(state)
}))(Render);
