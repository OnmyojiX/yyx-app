import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Dispatch
} from "redux";
import thunk, { ThunkDispatch, ThunkAction } from "redux-thunk";

import * as error from "../modules/error";
import * as hero from "../modules/hero";
import * as equip from "../modules/equip";
import { IAccountState, accountReducer } from "../modules/account/reducer";
import { ISnapshotState, snapshotReducer } from "../modules/snapshot/reducer";

export interface IAction<T = string> {
  type: T;
  payload?: any;
}

export type IDispatch<T = string, S = any> = ThunkDispatch<S, void, IAction<T>>;

export interface IYyxState {
  error: error.IState;
  account: IAccountState;
  snapshot: ISnapshotState;
  hero: hero.IState;
  equip: equip.IState;
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const YyxStore = createStore<IYyxState, any, {}, {}>(
  combineReducers({
    error: error.reducer,
    account: accountReducer,
    snapshot: snapshotReducer,
    hero: hero.reducer,
    equip: equip.reducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
