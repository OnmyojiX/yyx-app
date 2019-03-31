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
        <EquipTypeIcon id={suit_id} />
      </div>
    </div>
  );
};

export const EquipTypeIcon: SFC<{ id: number; size?: number }> = ({
  id,
  size = 80
}) => {
  return <img src={`/res/suit/${id}.png`} width={size} height={size} />;
};
