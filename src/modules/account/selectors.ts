import { IYyxState } from "../../store";
import { createSelector } from "reselect";
import { IAccountInfo } from "./types";
import { AccountService } from "./service";

const accounts = (state: IYyxState) => state.account.accounts;
const activeStates = (state: IYyxState) => state.account.activeStates;
const accountsSelector = createSelector(
  accounts,
  activeStates,
  (accounts, states) => {
    return accounts.map(a => {
      const path = AccountService.getAccountPath(a.id);
      return {
        ...a,
        path,
        state: states.find(s => s.path === path)
      };
    }) as IAccountInfo[];
  }
);

export const AccountSelectors = {
  accounts: accountsSelector,
  current: (state: IYyxState) => state.account.current,
  currentNotFound: (state: IYyxState) => state.account.currentNotFound,
  loading: (state: IYyxState) => state.account.loading,
  error: (state: IYyxState) => state.account.error
};
