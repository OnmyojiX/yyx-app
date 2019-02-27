import { IAction, IDispatch } from "../../store";
import { HttpClient } from "../http";

export interface ISnapshotInfo {
  version: string;
  timestamp: string;
  heroes: number;
  hero_equips: number;
  hero_equip_presets: number;
  hero_book_shards: number;
}

export interface IState {
  currentNotSelected: boolean;
  current: ISnapshotInfo | null;
}

const initialState: IState = {
  currentNotSelected: false,
  current: null
};

export enum ActionType {
  SetCurrent = "SNAPSHOT_SET_CURRENT"
}

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SetCurrent:
      return {
        ...state,
        currentNotSelected: !payload,
        current: payload
      };
  }
  return state;
}

export const SnapshotActions = {
  select(file: File) {
    return async (dispatch: IDispatch<ActionType>) => {
      await HttpClient.put("/api/snapshot", file);
      dispatch(SnapshotActions.loadCurrent());
    };
  },
  resetCurrent() {
    return {
      type: ActionType.SetCurrent,
      payload: null
    };
  },
  loadCurrent() {
    return async (dispatch: IDispatch<ActionType>) => {
      dispatch({
        type: ActionType.SetCurrent,
        payload: await HttpClient.get("/api/snapshot-info").then(
          res => res.data
        )
      });
    };
  }
};
