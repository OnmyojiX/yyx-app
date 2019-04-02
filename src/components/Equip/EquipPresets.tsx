import React, { SFC, useState, useEffect } from "react";
import "./EquipPresets.scss";
import { connect } from "react-redux";
import { IHeroEquip, IHeroEquipPreset } from "../../interfaces";
import { IYyxState } from "../../store";
import { EquipSelectors } from "../../modules/equip";
import { Card, InputGroup } from "@blueprintjs/core";
import { Equips } from "./Equips";
import { EquipSet } from "./EquipSet";
import { useDebounce } from "../../hooks/debounce";

const Render: SFC<{
  presets: IHeroEquipPreset[] | null;
}> = props => {
  const [term, setTerm] = useState("");
  const termDebounced = useDebounce(term.trim(), 300);
  const [list, setList] = useState(props.presets);

  useEffect(() => {
    if (!props.presets) {
      return;
    }
    if (termDebounced) {
      setList(props.presets.filter(p => p.name.includes(termDebounced)));
    } else {
      setList(props.presets);
    }
  }, [props.presets, termDebounced]);

  const { presets } = props;

  if (!presets || !list) {
    return null;
  }

  return (
    <div className="yyx-padding">
      <Card className="yyx-layout row wrap yyx-options yyx-space-v">
        <div className="item yyx-space-h">
          <InputGroup
            leftIcon="filter"
            placeholder="搜索名称..."
            value={term}
            onChange={(e: any) => setTerm(e.target.value)}
          />
        </div>
        <div className="item">数量: {list.length}</div>
      </Card>
      <ul className="bp3-list-unstyled equip-preset-list">
        {list.map((i, idx) => (
          <li key={idx}>
            <Card key={idx}>
              <h2>{i.name}</h2>
              <Equips
                ids={i.items}
                render={equips => <EquipSet equips={equips} />}
              />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const EquipPresets = connect((state: IYyxState) => ({
  presets: EquipSelectors.selectPresets(state)
}))(Render);
