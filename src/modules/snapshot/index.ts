import { IAction, IDispatch, IYyxState } from "../../store";
import { HttpClient } from "../http";
import { ISnapshot } from "../../interfaces";
import { HeroActions } from "../hero";

export interface IState {
  currentNotSelected: boolean;
  current: ISnapshot | null;
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

const selectCurrentSnapshot = (state: IYyxState) =>
  state.snapshot && state.snapshot.current;

export const SnapshotSelectors = {
  selectCurrentSnapshot
};

export const SnapshotActions = {
  select(file: File) {
    return async (dispatch: IDispatch<ActionType>) => {
      await HttpClient.put("/api/snapshot", file);
      dispatch(SnapshotActions.loadCurrent());
    };
  },
  resetCurrent() {
    return (dispatch: IDispatch) => {
      dispatch({
        type: ActionType.SetCurrent,
        payload: null
      });
    };
  },
  loadCurrent() {
    return async (dispatch: IDispatch<ActionType>) => {
      dispatch({
        type: ActionType.SetCurrent,
        payload: await HttpClient.get("/api/snapshot").then(res => res.data)
      });
    };
  }
};
