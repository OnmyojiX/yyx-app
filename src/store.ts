import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Dispatch
} from "redux";
import thunk, { ThunkDispatch, ThunkAction } from "redux-thunk";

import * as error from "./modules/error";
import * as snapshot from "./modules/snapshot";
import * as hero from "./modules/hero";

type ActionType = error.ActionType | snapshot.ActionType | hero.ActionType;

export interface IAction<T = ActionType> {
  type: T;
  payload: any;
}

export type IDispatch<T = ActionType> = ThunkDispatch<
  IYyxState,
  void,
  IAction<T>
>;

export interface IYyxState {
  error: error.IState;
  snapshot: snapshot.IState;
  hero: hero.IState;
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const YyxStore = createStore<IYyxState, any, {}, {}>(
  combineReducers({
    error: error.reducer,
    snapshot: snapshot.reducer,
    hero: hero.reducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
