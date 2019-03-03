import { IAction, IDispatch, IYyxState } from "../../store";
import { IHero, HeroRarity } from "../../interfaces";
import { createSelector } from "reselect";
import { defaultSorter } from "./sorters";
import { getHeroData } from "./data";

export interface IState {}

const initialState: IState = {};

export enum ActionType {}

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  // switch (type) {
  // }
  return state;
}

export const HeroActions = {};

const selectAll = (state: IYyxState) =>
  state.snapshot.current &&
  state.snapshot.current.data.heroes.map(hero => {
    hero.data = getHeroData(hero.hero_id);
    return hero;
  });

const selectMapByRarity = createSelector(
  selectAll,
  heroes => {
    if (!heroes) {
      return null;
    }
    const groups = heroes.reduce((m, i) => {
      let list = m.get(i.rarity);
      if (!list) {
        list = [];
        m.set(i.rarity, list);
      }
      list.push(i);
      return m;
    }, new Map<HeroRarity, IHero[]>());
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

export const HeroSelectors = {
  selectAllSorted
};
