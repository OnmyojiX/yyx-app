import React, { SFC, useState, useEffect } from "react";
import classNames from "classnames";
import "./EquipPosition.scss";

const Labels = ["", "壹", "贰", "叁", "肆", "伍", "陆"];

export const EquipPosition: SFC<{
  className?: string;
  labelElement?: (pos: number) => React.ReactNode;
  position: number;
  active?: boolean;
  onClick?: (pos: number) => void;
}> = props => {
  return (
    <div
      className={classNames(
        "equip-position",
        `pos-${props.position}`,
        props.onClick && "clickable",
        props.active && "active",
        props.className
      )}
      onClick={() => props.onClick && props.onClick(props.position)}
    >
      <div className="content">
        {props.labelElement ? (
          props.labelElement(props.position)
        ) : (
          <div className="equip-position-text">{Labels[props.position]}</div>
        )}
      </div>
    </div>
  );
};
