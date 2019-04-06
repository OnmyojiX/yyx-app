import { connect } from "react-redux";
import { ReactElement, SFC } from "react";
import { IYyxState } from "../../store";
import { IHeroEquip } from "../../interfaces";
import { EquipSelectors } from "../../modules/equip";

interface RenderProps {
  equips: IHeroEquip[];
  render: (equips: IHeroEquip[]) => ReactElement | null;
}

const Render: SFC<RenderProps> = (props: RenderProps) => {
  return props.render(props.equips);
};

export interface EquipsProps {
  ids: string[];
  render: (equips: IHeroEquip[]) => ReactElement | null;
}

export const Equips = connect((state: IYyxState, props: EquipsProps) => {
  const maps = EquipSelectors.selectMaps(state);
  return {
    equips:
      maps && maps.id
        ? (props.ids
            .map(id => maps.id.get(id))
            .filter(v => !!v) as IHeroEquip[])
        : [],
    render: props.render
  };
})(Render);
