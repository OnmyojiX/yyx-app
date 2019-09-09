import { createSelector } from "reselect";
import { IHeroBookShard } from "../../interfaces";
import { sortDesc, combineSorters } from "../../utils";
import { getHeroData, RarityRank } from "../hero/data";
import { SnapshotSelectors } from "../snapshot/selectors";

const selectAll = createSelector(
  SnapshotSelectors.currentSnapshot,
  snapshot => {
    if (!snapshot) {
      return null;
    }
    return snapshot.data.hero_book_shards.map(i => {
      i.hero_data = getHeroData(i.hero_id);
      return i;
    });
  }
);

const getRarityRank = (s: IHeroBookShard) =>
  s.hero_data ? RarityRank[s.hero_data.rarity] : 999;

const defaultSorter = combineSorters<IHeroBookShard>(
  sortDesc((a, b) => getRarityRank(a) - getRarityRank(b)),
  sortDesc((a, b) => a.hero_id - b.hero_id)
);

const selectSorted = createSelector(
  selectAll,
  items => {
    if (!items) {
      return null;
    }

    return items
      .slice()
      .filter(i => i.shards > 0 || i.books > 0)
      .sort(defaultSorter);
  }
);

export const ShardSelectors = {
  selectSorted
};
