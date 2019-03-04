import React, { SFC } from "react";
import "./EquipIcon.scss";
import classNames from "classnames";

export const EquipIcon: SFC<{
  suit_id: number;
  pos: number;
  className?: string;
}> = props => {
  const { suit_id, pos, className } = props;
  return (
    <div className={classNames("hero-equip-icon", className)}>
      <div className={classNames("icon", `pos-${pos + 1}`)}>
        <img src={`/res/suit/${suit_id}.png`} />
      </div>
    </div>
  );
};
