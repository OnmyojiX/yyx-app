import { IAction, IDispatch, IYyxState } from "../../store";
import { createSelector } from "reselect";
import {
  IHeroEquip,
  HeroEquipAttrType,
  IHeroEquipPreset,
  IHero
} from "../../interfaces";
import { defaultSorter } from "./sorters";
import { getEquipSuiteData } from "./data";
import { number, string } from "prop-types";
import { HeroSelectors } from "../hero";
import { SnapshotSelectors } from "../snapshot";

export interface IState {}

const initialState: IState = {};

export enum ActionType {}

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  // switch (type) {
  // }
  return state;
}

export const EquipActions = {};

const selectEquippedByMap = createSelector(
  HeroSelectors.selectAll,
  heroes => {
    const equippedByMap = new Map<string, IHero>();
    if (heroes) {
      for (let h of heroes) {
        for (let id of h.equips) {
          equippedByMap.set(id, h);
        }
      }
    }
    return equippedByMap;
  }
);

const selectPresets = createSelector(
  SnapshotSelectors.selectCurrentSnapshot,
  snapshot => {
    if (!snapshot) {
      return null;
    }
    return snapshot.data.hero_equip_presets;
  }
);

const selectIncludedInPresetsMap = createSelector(
  selectPresets,
  presets => {
    const map = new Map<string, IHeroEquipPreset[]>();
    if (presets) {
      for (let p of presets) {
        for (let id of p.items) {
          let list = map.get(id);
          if (!list) {
            list = [p];
            map.set(id, list);
          } else {
            list.push(p);
          }
        }
      }
    }
    return map;
  }
);

const selectAll = createSelector(
  (state: IYyxState) => state.snapshot.current,
  selectEquippedByMap,
  selectIncludedInPresetsMap,
  (snapshot, equippedBy, inPresets) => {
    if (!snapshot) {
      return null;
    }
    return snapshot.data.hero_equips.map(equip => {
      equip.suit_data = getEquipSuiteData(equip.suit_id);
      equip.equipped_by = equippedBy.get(equip.id);
      equip.included_in_presets = inPresets.get(equip.id);
      return equip;
    });
  }
);

const selectAllSorted = createSelector(
  selectAll,
  equips => {
    if (!equips) {
      return null;
    }
    return equips.slice().sort(defaultSorter);
  }
);

const selectMaps = createSelector(
  selectAllSorted,
  equips => {
    if (!equips) {
      return null;
    }

    const qualityMap = new Map<number, IHeroEquip[]>();
    const levelMap = new Map<number, IHeroEquip[]>();
    const suitMap = new Map<number, IHeroEquip[]>();
    const posMap = new Map<number, IHeroEquip[]>();
    const baseAttrMap = new Map<HeroEquipAttrType, IHeroEquip[]>();

    function push<K>(
      map: Map<K, IHeroEquip[]>,
      i: IHeroEquip,
      selector: (i: IHeroEquip) => K
    ) {
      const key = selector(i);
      let list = map.get(key);
      if (!list) {
        list = [i];
        map.set(key, list);
      } else {
        list.push(i);
      }
    }

    for (let e of equips) {
      push(qualityMap, e, e => e.quality);
      push(levelMap, e, e => e.level);
      push(suitMap, e, e => e.suit_id);
      push(posMap, e, e => e.pos);
      push(baseAttrMap, e, e => e.base_attr.type);
    }

    return {
      quality: qualityMap,
      level: levelMap,
      suit: suitMap,
      base_attr: baseAttrMap
    };
  }
);

const selectDisplay = createSelector(
  selectAllSorted,
  equips => {
    if (!equips) {
      return null;
    }
    return equips.filter(
      e => !e.garbage && (e.quality === 6 || e.level === 15)
    );
  }
);

export const EquipSelectors = {
  selectAllSorted,
  selectMaps,
  selectDisplay,
  selectPresets
};
