import React, { SFC, useState, useEffect } from "react";
import classNames from "classnames";
import "./EquipSet.scss";
import { IHeroEquip } from "../../interfaces";
import { EquipItem } from "./EquipItem";
import { Popover, Classes, PopperModifiers } from "@blueprintjs/core";
import { EquipDetail } from "./EquipDetail";

export const EquipSet: SFC<{
  className?: string;
  equips: IHeroEquip[];
}> = props => {
  const [items, setItems] = useState<(IHeroEquip | null)[]>([]);

  useEffect(() => {
    const list = new Array(6).fill(null);
    for (let equip of equips) {
      list[equip.pos] = equip;
    }
    setItems(list);
  }, [props.equips]);

  const { equips } = props;

  return (
    <div className="equip-set">
      {items.map(i => {
        return (
          i && (
            <div key={i.id} className={`equip-set-item pos-${i.pos + 1}`}>
              <EquipItem minimal equip={i} />
            </div>
          )
        );
      })}
    </div>
  );
};
