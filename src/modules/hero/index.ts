import { IAction, IDispatch, IYyxState } from "../../store";
import { IHero, HeroRarity, IHeroData } from "../../interfaces";
import { createSelector } from "reselect";
import { defaultSorter } from "./sorters";
import { getHeroData, DATA, RarityRank } from "./data";
import { Sorter, combineFilters, getTimestampFromObjectId } from "../../utils";

export type HeroFilter = (item: IHeroFilterable) => boolean;

export interface IHeroFilterable {
  rarity: HeroRarity;
  star: number;
  nick_name?: string;
  hero_id: number;
}

export interface IHeroSortable {
  level: number;
  star: number;
  rarity: HeroRarity;
  born: number;
}

export interface IHeroListOptions {
  fold: boolean;
  rarity: RarityOption;
  star: number;
  term: string;
}

export interface IState {
  listOptions: IHeroListOptions | null;
}

const initialState: IState = {
  listOptions: null
};

export type RarityOption = "*" | HeroRarity | "M";

export enum ActionType {
  SetListOptions = "Hero.SetListOptions"
}

export const HeroActions = {
  setListOptions(opts: IHeroListOptions) {
    return {
      type: ActionType.SetListOptions,
      payload: opts
    };
  }
};

const materialRarityFilter = (hero: { hero_id: number }) =>
  [410, 411, 412, 413].includes(hero.hero_id);

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

const selectAll = (state: IYyxState) =>
  state.snapshot.current &&
  state.snapshot.current.data.heroes.map(hero => {
    hero.data = getHeroData(hero.hero_id);
    hero.timestamp_from_id = getTimestampFromObjectId(hero.id);
    return hero;
  });

const selectMapById = createSelector(
  selectAll,
  heroes => {
    if (!heroes) {
      return null;
    }
    const groups = heroes.reduce((m, i) => {
      m.set(i.id, i);
      return m;
    }, new Map<string, IHero>());
    return groups;
  }
);

const selectAllSorted = createSelector(
  selectAll,
  heroes => {
    if (!heroes) {
      return null;
    }
    return heroes.slice().sort(defaultSorter);
  }
);

const selectMapByHeroId = createSelector(
  selectAllSorted,
  heroes => {
    if (!heroes) {
      return null;
    }
    const groups = heroes.reduce((m, i) => {
      let list = m.get(i.hero_id);
      if (!list) {
        list = [];
        m.set(i.hero_id, list);
      }
      list.push(i);
      return m;
    }, new Map<number, IHero[]>());
    return groups;
  }
);

export interface IHeroFolded {
  hero_id: number;
  level: number;
  awake: number;
  star: number;
  rarity: HeroRarity;
  heroes: IHero[];
  data: IHeroData;
}

const FORCE_FOLD_HERO_IDS = [
  205, // 座敷童子
  232, // 铁鼠
  237 // 山兔
];

const selectAllFolded = createSelector(
  selectAllSorted,
  heroes => {
    if (!heroes) {
      return null;
    }

    const skipped: IHero[] = [];

    let groups = heroes.reduce((m, i) => {
      if (
        !FORCE_FOLD_HERO_IDS.includes(i.hero_id) &&
        (i.awake ||
          RarityRank[i.rarity] > RarityRank[HeroRarity.SR] ||
          i.lock ||
          i.nick_name)
      ) {
        skipped.push(i);
        return m;
      }

      let group = m.get(i.hero_id);
      if (!group) {
        group = [];
        m.set(i.hero_id, group);
      }
      const item = group.find(
        gi => gi.level === i.level && gi.awake === i.awake && gi.star === i.star
      );
      if (item) {
        item.heroes.push(i);
      } else {
        group.push({
          hero_id: i.hero_id,
          level: i.level,
          awake: i.awake,
          star: i.star,
          rarity: i.rarity,
          heroes: [i],
          data: i.data
        } as IHeroFolded);
      }
      return m;
    }, new Map<number, IHeroFolded[]>());
    const folded = [];
    for (let v of groups.values()) {
      for (let vi of v) {
        if (vi.heroes.length === 1) {
          skipped.push(vi.heroes[0]);
        } else {
          folded.push(vi);
        }
      }
    }
    return [...skipped, ...folded];
  }
);

const selectState = (state: IYyxState) => state.hero;
const selectListOptions = createSelector(
  selectState,
  state => state.listOptions
);

const createTermFilter = (term: string) => {
  const v = term.trim();
  const heroIds = DATA.filter((i: IHeroData) => i.name.includes(v)).map(
    (i: IHeroData) => i.id
  );
  return (i: IHeroFilterable) => {
    return (
      heroIds.includes(i.hero_id) ||
      (i.nick_name ? i.nick_name.includes(v) : false)
    );
  };
};

const createStarFilter = (v: number) => {
  return (i: IHeroFilterable) => {
    return i.star === v;
  };
};

const createRarityFilter = (r: RarityOption) => {
  if (r === "M") {
    return materialRarityFilter;
  }
  return (i: IHeroFilterable) => {
    return i.rarity === r;
  };
};

const selectList = createSelector(
  selectAllSorted,
  selectAllFolded,
  selectListOptions,
  (sorted, folded, opts) => {
    if (!opts) {
      return null;
    }

    const filters = [
      opts.term && createTermFilter(opts.term),
      opts.rarity === "*" ? null : createRarityFilter(opts.rarity),
      opts.star && createStarFilter(opts.star)
    ].filter(v => !!v) as HeroFilter[];
    const filter = filters.length && combineFilters(...filters);
    if (opts.fold) {
      if (!folded) {
        return null;
      }
      return filter ? folded.filter(filter) : folded;
    } else {
      if (!sorted) {
        return null;
      }
      return filter ? sorted.filter(filter) : sorted;
    }
  }
);

const selectCount = createSelector(
  selectList,
  list => {
    if (!list) {
      return 0;
    }
    return list
      .map(i => {
        if ("heroes" in i) {
          return i.heroes.length;
        } else {
          return 1;
        }
      })
      .reduce((l, r) => l + r, 0);
  }
);

export const HeroSelectors = {
  selectAll,
  selectAllSorted,
  selectAllFolded,
  selectMapById,
  selectMapByHeroId,
  selectListOptions,
  selectList,
  selectCount
};
