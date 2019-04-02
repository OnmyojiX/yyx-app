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
import { HeroSelectors } from "../hero";
import { SnapshotSelectors } from "../snapshot";
import { getTimestampFromObjectId, Filter, combineFilters } from "../../utils";
import { getEquipScoreData } from "./score";

export interface IState {
  listOptions: IEquipListOptions | null;
}

const initialState: IState = {
  listOptions: null
};

export enum ActionType {
  SetListOptions = "Equip.etListOptions"
}

export const EquipActions = {
  setListOptions(opts: IEquipListOptions) {
    return {
      type: ActionType.SetListOptions,
      payload: opts
    };
  }
};

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SetListOptions: {
      return {
        ...state,
        listOptions: payload
      };
    }
  }
  return state;
}

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
      equip.timestamp_from_id = getTimestampFromObjectId(equip.id);
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

    const idMap = new Map<string, IHeroEquip>();
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
      idMap.set(e.id, e);
      push(qualityMap, e, e => e.quality);
      push(levelMap, e, e => e.level);
      push(suitMap, e, e => e.suit_id);
      push(posMap, e, e => e.pos);
      push(baseAttrMap, e, e => e.base_attr.type);
    }

    return {
      id: idMap,
      quality: qualityMap,
      level: levelMap,
      suit: suitMap,
      base_attr: baseAttrMap
    };
  }
);

export enum EquipLevelFilter {
  Any,
  Zero,
  Max
}

export enum EquipEquippedFilter {
  Any,
  Equipped,
  NotEquipped
}

export interface IEquipListOptions {
  id: string;
  types: number[] | null;
  positions: number[];
  stars: number[];
  baseAttrs: HeroEquipAttrType[] | null;
  trashed: boolean | null;
  level: EquipLevelFilter;
  equipped: EquipEquippedFilter;
  creationTimeFrom: Date | null;
  creationTimeTo: Date | null;
  scores: number[];
}

const selectDisplay = createSelector(
  selectAllSorted,
  (state: IYyxState) => state.equip.listOptions,
  (equips, opts) => {
    if (!opts) {
      return null;
    }

    if (!equips) {
      return null;
    }

    if (opts.id) {
      return equips.filter(e => e.id === opts.id);
    }

    const filters: Array<Filter<IHeroEquip>> = [];

    if (opts.types && opts.types.length) {
      filters.push(i => !!(opts.types && opts.types.includes(i.suit_id)));
    }

    if (opts.positions && opts.positions.length) {
      filters.push(
        i => !!(opts.positions && opts.positions.includes(i.pos + 1))
      );
    }

    if (opts.stars && opts.stars.length) {
      filters.push(i => !!(opts.stars && opts.stars.includes(i.quality)));
    }

    if (opts.baseAttrs && opts.baseAttrs.length) {
      filters.push(
        i => !!(opts.baseAttrs && opts.baseAttrs.includes(i.base_attr.type))
      );
    }

    if (opts.level !== EquipLevelFilter.Any) {
      if (opts.level === EquipLevelFilter.Zero) {
        filters.push(i => i.level === 0);
      } else {
        filters.push(i => i.level === 15);
      }
    }

    if (opts.equipped !== EquipEquippedFilter.Any) {
      if (opts.equipped === EquipEquippedFilter.Equipped) {
        filters.push(i => !!i.equipped_by);
      } else {
        filters.push(i => !i.equipped_by);
      }
    }

    if (opts.trashed !== null) {
      filters.push(i => i.garbage === opts.trashed);
    }

    if (opts.scores.length) {
      filters.push(i => {
        const scoreData = getEquipScoreData(i);
        if (!scoreData) {
          return false;
        } else {
          return opts.scores.includes(scoreData.score);
        }
      });
    }

    if (opts.creationTimeFrom) {
      const t = opts.creationTimeFrom.getTime() / 1000;
      filters.push(i => getTimestampFromObjectId(i.id) >= t);
    }

    if (opts.creationTimeTo) {
      const t = opts.creationTimeTo.getTime() / 1000;
      filters.push(i => getTimestampFromObjectId(i.id) < t);
    }

    if (filters.length) {
      return equips.filter(combineFilters(...filters));
    }

    return equips;
  }
);

export const EquipSelectors = {
  selectAllSorted,
  selectMaps,
  selectDisplay,
  selectPresets
};
