import { IAction, IDispatch, IYyxState } from "../../store";
import { createSelector } from "reselect";
import { IRealmCard, IRealmCardData } from "../../interfaces";
import { getRealmCardData, RealmCardNames } from "./data";
import { sortDesc } from "../../utils";
import { SnapshotSelectors } from "../snapshot/selectors";

const selectAll = createSelector(
  SnapshotSelectors.currentSnapshot,
  snapshot => {
    if (!snapshot) {
      return null;
    }
    return snapshot.data.realm_cards.map(c => {
      c.data = getRealmCardData(c.item_id);
      return c;
    });
  }
);

export type IRealmCardGroupMapByName = Map<
  string, // name
  Array<{
    item_id: number;
    star: number;
    count: number;
  }>
>;

const selectGroupMapByName = createSelector(
  selectAll,
  cards => {
    if (!cards) {
      return null;
    }
    const map: IRealmCardGroupMapByName = new Map();

    cards
      .slice()
      .sort(
        sortDesc((a, b) => {
          return (a.data ? a.data.star : 0) - (b.data ? b.data.star : 0);
        })
      )
      .forEach(c => {
        const name = c.data && c.data.name;
        const star = c.data && c.data.star;

        if (name && star) {
          let list = map.get(name);
          if (!list) {
            map.set(name, [
              {
                item_id: c.item_id,
                star,
                count: 1
              }
            ]);
          } else {
            const entry = list.find(i => i.item_id === c.item_id);
            if (entry) {
              entry.count++;
            } else {
              list.push({
                item_id: c.item_id,
                star,
                count: 1
              });
            }
          }
        }
      });

    return map;
  }
);

export interface IRealmCardGroup {
  name: string;
  items: Array<{
    item_id: number;
    star: number;
    count: number;
  }>;
}

const selectGroups = createSelector(
  selectGroupMapByName,
  map => {
    if (!map) {
      return null;
    }

    return RealmCardNames.map(name => [name, map.get(name)])
      .filter(v => !!v[1])
      .map(([name, items]) => {
        return {
          name,
          items
        };
      }) as IRealmCardGroup[];
  }
);

export const RealmCardSelectors = {
  selectGroups
};
