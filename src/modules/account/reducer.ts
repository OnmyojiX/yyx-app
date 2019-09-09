import { IAction } from "../../store";
import {
  IAccount,
  YyxAccountId,
  CbgAccountId,
  AccountId,
  IAccountActiveState
} from "./types";
import {
  ACTION_ACCOUNT_SET_ERROR,
  ACTION_ACCOUNT_SET_LOADING,
  ACTION_ACCOUNT_SET_ACCOUNTS,
  ACTION_ACCOUNT_SELECT,
  ACTION_ACCOUNT_SET_ACTIVE_STATES,
  ACTION_ACCOUNT_DELETE_ID
} from "./constants";
import { AccountService } from "./service";

export interface IAccountState {
  loading: boolean;
  error: Error | null;
  accounts: IAccount[];
  activeStates: IAccountActiveState[];
  current: IAccount | null;
  currentNotFound: boolean;
}

const initialState: IAccountState = {
  loading: true,
  error: null,
  accounts: [],
  activeStates: [],
  current: null,
  currentNotFound: false
};

export function accountReducer(state = initialState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_ACCOUNT_SET_LOADING:
      return {
        ...state,
        loading: payload,
        current: null,
        currentNotFound: false
      };
    case ACTION_ACCOUNT_SET_ERROR:
      return {
        ...state,
        error: payload
      };
    case ACTION_ACCOUNT_SET_ACCOUNTS:
      return {
        ...state,
        accounts: payload
      };
    case ACTION_ACCOUNT_SELECT: {
      const id = payload as AccountId;
      const current =
        state.accounts.find(a => {
          return (
            AccountService.getAccountPath(id) ===
            AccountService.getAccountPath(a.id)
          );
        }) || null;
      return {
        ...state,
        current,
        currentNotFound: !current
      };
    }
    case ACTION_ACCOUNT_SET_ACTIVE_STATES: {
      const states = payload as Array<Omit<IAccountActiveState, "path">>;
      return {
        ...state,
        activeStates: states.map(state => {
          return {
            ...state,
            path: AccountService.getAccountPath(state.id)
          };
        })
      };
    }
    case ACTION_ACCOUNT_DELETE_ID: {
      return {
        ...state,
        accounts: state.accounts.filter(
          a =>
            AccountService.getAccountPath(a.id) !==
            AccountService.getAccountPath(payload)
        )
      };
    }
  }
  return state;
}
