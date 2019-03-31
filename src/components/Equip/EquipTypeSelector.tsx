import React, { SFC, useState, useEffect } from "react";
import "./EquipTypeSelector.scss";

import {
  Button,
  MenuItem,
  Dialog,
  Classes,
  Intent,
  Tag,
  Icon
} from "@blueprintjs/core";
import { IHeroEquipSuitData } from "../../interfaces";
import { ALL_SUIT_DATA, getEquipSuiteData } from "../../modules/equip/data";
import { EquipTypeIcon } from "./EquipIcon";
import { getEquipSuitAttrName } from "../../modules/equip/attr";

export interface EquipTypeSelectorProps {
  value?: IHeroEquipSuitData;
  onChange?: (suitId: number) => void;
}

export const EquipTypeSelector: SFC<EquipTypeSelectorProps> = props => {
  return null;
};

export interface EquipTypeMultiSelectorProps {
  className?: string;
  value?: number[];
  onChange?: (suitIds: number[]) => void;
}

// const renderEquipType: ItemRenderer<IHeroEquipSuitData> = (option, params) => {
//   return (
//     <MenuItem
//       key={option.id}
//       text={option.name}
//       onClick={params.handleClick}
//       active={params.modifiers.active}
//       labelElement={<EquipTypeIcon id={option.id} />}
//     />
//   );
// };

const renderEquipTypeTag = (i: IHeroEquipSuitData) => {
  return null;
};

const EquipTypeDialog: SFC<{
  multiple: boolean;
  selected: number[];
  setIdSelected: (id: number, selected: boolean) => void;
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}> = props => {
  return (
    <Dialog isOpen={props.isOpen} onClose={() => props.onCancel()}>
      <div className={Classes.DIALOG_BODY}>
        <ul className="equip-type-dialog-type-list">
          {ALL_SUIT_DATA.map(i => {
            const selected = props.selected.includes(i.id);
            return (
              <li
                className={selected ? "selected" : ""}
                key={i.id}
                onClick={() => props.setIdSelected(i.id, !selected)}
              >
                <div className="content">
                  <EquipTypeIcon id={i.id} size={50} />
                  <div className="description">
                    <span className="name">{i.name}</span>
                    <br />
                    <Tag>{getEquipSuitAttrName(i)}</Tag>
                  </div>
                </div>
                <div className="tick">
                  <Icon icon="small-tick" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={() => props.onCancel()}>取消</Button>
          <Button intent={Intent.PRIMARY} onClick={() => props.onOk()}>
            确定
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const EmptyList: number[] = [];

const renderTypeList = (ids: number[]) => {
  return (
    <ul className="bp3-list-unstyled icon-list">
      {ids.map(id => {
        return (
          <li key={id}>
            <EquipTypeIcon id={id} size={24} />
          </li>
        );
      })}
    </ul>
  );
};

export const EquipTypeMultiSelector: SFC<
  EquipTypeMultiSelectorProps
> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSelected, setDialogSelected] = useState(EmptyList);
  const [selected, setSelected] = useState(props.value || EmptyList);

  return (
    <div className={props.className}>
      <EquipTypeDialog
        isOpen={dialogOpen}
        onCancel={() => {
          setDialogOpen(false);
        }}
        onOk={() => {
          setDialogOpen(false);
          setSelected(dialogSelected);
          if (props.onChange) {
            props.onChange(dialogSelected);
          }
        }}
        multiple
        selected={dialogSelected}
        setIdSelected={(id, idSelected) => {
          setDialogSelected(
            idSelected
              ? [...dialogSelected.filter(v => v !== id), id]
              : dialogSelected.filter(v => v !== id)
          );
        }}
      />
      <Button
        className="equip-type-selector-button"
        onClick={() => {
          setDialogSelected(selected);
          setDialogOpen(true);
        }}
      >
        <div className="yyx-layout row wrap">
          {selected.length ? renderTypeList(selected) : <span>全部</span>}
        </div>
      </Button>
    </div>
  );
};
