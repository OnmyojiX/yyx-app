import React, { SFC, useState, useEffect } from "react";
import "./EquipPresets.scss";
import { connect } from "react-redux";
import {
  IHeroEquip,
  IHeroEquipPreset,
  HeroEquipAttrType
} from "../../interfaces";
import { IYyxState } from "../../store";
import { EquipSelectors, IEquipPresetItem } from "../../modules/equip";
import { Card, InputGroup, Divider } from "@blueprintjs/core";
import { Equips } from "./Equips";
import { EquipSet } from "./EquipSet";
import { useDebounce } from "../../hooks/debounce";
import { EquipSetAttrs } from "./EquipSetAttrs";
import { EquipTypeMultiSelector } from "./EquipTypeSelector";

const Render: SFC<{
  presets: IEquipPresetItem[] | null;
}> = props => {
  const [term, setTerm] = useState("");
  const [suites, setSuites] = useState<number[]>([]);
  const termDebounced = useDebounce(term.trim(), 300);
  const [list, setList] = useState(props.presets);

  useEffect(() => {
    if (!props.presets) {
      return;
    }
    let filteredList = props.presets;

    if (suites.length) {
      filteredList = filteredList.filter(p =>
        suites.length < p.suits.length
          ? p.suits.some(data => suites.includes(data.id))
          : p.suits.length == suites.length &&
            p.suits.every(data => suites.includes(data.id))
      );
    }

    if (termDebounced) {
      filteredList = filteredList.filter(p => p.name.includes(termDebounced));
    }

    setList(filteredList);
  }, [props.presets, termDebounced, suites]);

  const { presets } = props;

  if (!presets || !list) {
    return null;
  }

  return (
    <div className="yyx-padding">
      <Card className="yyx-layout row wrap yyx-options yyx-space-v">
        <div className="item">
          <InputGroup
            leftIcon="filter"
            placeholder="搜索名称..."
            value={term}
            onChange={(e: any) => setTerm(e.target.value)}
          />
        </div>
        <div className="yyx-layout row item">
          <label className="item">套装: </label>
          <EquipTypeMultiSelector
            className="item"
            onChange={types => setSuites(types)}
          />
        </div>
        <div className="item">数量: {list.length}</div>
      </Card>
      <ul className="bp3-list-unstyled equip-preset-list">
        {list.map((i, idx) => (
          <li key={idx}>
            <div className="yyx-layout row title">
              <div className="item name">{i.name}</div>
              <div className="item right" />
            </div>
            <EquipSet equips={i.equips} />
            <EquipSetAttrs info={i} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const EquipPresets = connect((state: IYyxState) => ({
  presets: EquipSelectors.selectPresetItems(state)
}))(Render);
