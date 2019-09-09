import { IYyxState } from "../../store";

export const SnapshotSelectors = {
  currentSnapshot: (state: IYyxState) =>
    state.snapshot && state.snapshot.current,

  isCbgSnapshot: (state: IYyxState) =>
    state.snapshot && state.snapshot.current && !!state.snapshot.current.cbg_url
};
