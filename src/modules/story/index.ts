import { createSelector } from "reselect";
import { SnapshotSelectors } from "../snapshot";

const selectProgressMap = createSelector(
  SnapshotSelectors.selectCurrentSnapshot,
  s => {
    if (!s) {
      return null;
    }
    return s.data.story_tasks.reduce((m, i) => {
      m.set(i.id, [i.progress.value, i.progress.max_value]);
      return m;
    }, new Map<number, [number, number]>());
  }
);

export const StorySelectors = {
  selectProgressMap
};
