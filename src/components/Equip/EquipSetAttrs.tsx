import React, { SFC, useState, useEffect } from "react";
import "./EquipSetAttrs.scss";
import { IEquipSetInfo } from "../../modules/equip";

import {
  getEquipAttrName,
  formatEquipAttrValue
} from "../../modules/equip/attr";
import { formatAttrValue } from "../../utils";
import { HeroEquipAttrType } from "../../interfaces";
import classNames from "classnames";
import { EquipTypeIcon } from "./EquipIcon";

const AttrTable = [
  [HeroEquipAttrType.Attack, HeroEquipAttrType.CritRate],
  [HeroEquipAttrType.AttackRate, HeroEquipAttrType.CritPower],
  [HeroEquipAttrType.Hp, HeroEquipAttrType.EffectHitRate],
  [HeroEquipAttrType.HpRate, HeroEquipAttrType.EffectResistRate],
  [HeroEquipAttrType.Defense, HeroEquipAttrType.Speed],
  [HeroEquipAttrType.DefenseRate, null]
];

export const EquipSetAttrs: SFC<{
  className?: string;
  info: IEquipSetInfo;
}> = ({ className, info }) => {
  return (
    <div className={classNames("equip-set-attrs", className)}>
      <ul className="attr-list">
        {AttrTable.map(([l, r], idx) => {
          return (
            <li key={idx} className="yyx-layout row">
              {l && (
                <div className="item yyx-layout row">
                  <label className="item">{getEquipAttrName(l)}</label>
                  <span className="item value">
                    {formatEquipAttrValue(l, info.attrMap.get(l) || 0, true)}
                  </span>
                </div>
              )}
              {r && (
                <div className="item yyx-layout row">
                  <label className="item">{getEquipAttrName(r)}</label>
                  <span className="item value">
                    {formatEquipAttrValue(r, info.attrMap.get(r) || 0, true)}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <ul className="suit-effect-list">
        {info.suits.map(data => {
          return (
            <li key={data.id} className="yyx-layout row">
              <div className="item icon">
                <EquipTypeIcon id={data.id} size={24} />
              </div>
              <div className="item effect-desc">
                {data.effect[3][0] || data.effect[1][0]}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
