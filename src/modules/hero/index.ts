import { IAction, IDispatch } from "../../store";
import { Hero } from "../../interfaces";
import { HttpClient } from "../http";

export interface IState {
  heros: Hero[] | null;
}

const initialState: IState = {
  heros: null
};

export enum ActionType {
  Loaded = "HERO_LOADED"
}

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.Loaded:
      return {
        ...state,
        heros: payload
      };
  }
  return state;
}

export const HeroActions = {
  load() {
    return async (dispatch: IDispatch<ActionType>) => {
      dispatch({
        type: ActionType.Loaded,
        payload: await HttpClient.get("/api/hero").then(res => res.data)
      });
    };
  }
};
