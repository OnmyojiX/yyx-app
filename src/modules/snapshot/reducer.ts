import { IAction } from "../../store";
import { ACTION_SNAPSHOT_SET_CURRENT } from "./constants";
import { ISnapshot } from "../../interfaces";

export interface ISnapshotState {
  currentNotSelected: boolean;
  current: ISnapshot | null;
}

const initialState: ISnapshotState = {
  currentNotSelected: false,
  current: null
};

export function snapshotReducer(state = initialState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_SNAPSHOT_SET_CURRENT:
      return {
        ...state,
        currentNotSelected: !payload,
        current: payload
      };
  }
  return state;
}
