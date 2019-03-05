import React, { SFC } from "react";
import "./EquipDetail.scss";
import { IHeroEquip, IHero, IHeroEquipPreset } from "../../interfaces";
import { EquipIcon } from "./EquipIcon";
import { Stars, StarType } from "../Common/Star";
import { formatEquipAttr } from "../../modules/equip/attr";
import { formatTimestamp } from "../../utils";

export const EquipDetail: SFC<{
  equip: IHeroEquip;
  equippedBy?: IHero;
  presets?: IHeroEquipPreset[];
}> = props => {
  const { equip } = props;
  const [baseAttrName, baseAttrValue] = formatEquipAttr(
    equip.base_attr.type,
    equip.base_attr.value
  );

  return (
    <div className="equip-detail">
      <header className="yyx-layout row">
        <div className="item icon">
          <EquipIcon suit_id={equip.suit_id} pos={equip.pos} />
        </div>
        <div className="item title">
          {equip.suit_data && equip.suit_data.name}
          {equip.level > 0 && (
            <>
              &nbsp;<span>+{equip.level}</span>
            </>
          )}
          <br />
          <Stars type={StarType.Orange} level={equip.quality} />
        </div>
      </header>
      <div className="attrs">
        <div className="yyx-layout row base-attr">
          <div className="name">{baseAttrName}</div>
          <div className="value">+{baseAttrValue}</div>
        </div>
        {equip.random_attrs.map(attr => {
          const [name, value] = formatEquipAttr(attr.type, attr.value);
          return (
            <div key={attr.type} className="yyx-layout row">
              <div className="name">{name}</div>
              <div className="value">{value}</div>
            </div>
          );
        })}
        {equip.single_attrs.length ? (
          <div className="single-attrs bp3-text-muted">
            {equip.single_attrs.map(attr => {
              const [name, value] = formatEquipAttr(attr.type, attr.value);
              return (
                <div key={name} className="yyx-layout row">
                  <div className="name">固有属性</div>
                  <div className="value">
                    {name} {value}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="props">
        <div className="yyx-layout row">
          <div className="name">ID</div>
          <div className="value id">{equip.id}</div>
        </div>
        <div className="yyx-layout row">
          <div className="name">获取时间</div>
          <div className="value">{formatTimestamp(equip.born)}</div>
        </div>
        {equip.equipped_by && (
          <div className="yyx-layout row">
            <div className="name">装备式神</div>
            <div className="value">
              {equip.equipped_by.nick_name ||
                (equip.equipped_by.data && equip.equipped_by.data.name)}
            </div>
          </div>
        )}
        {equip.included_in_presets && (
          <div className="yyx-layout row">
            <div className="name">所属方案</div>
            <div className="value">
              <ul className="preset-list">
                {equip.included_in_presets.map((p, i) => (
                  <li key={i}>{p.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
