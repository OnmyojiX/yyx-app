import { ACTION_SNAPSHOT_SET_CURRENT } from "./constants";
import { IDispatch } from "../../store";
import { HttpClient } from "../http";
import { ISnapshot } from "../../interfaces";
import { SnapshotService } from "./service";
import { AccountService } from "../account/service";
import { IAccount } from "../account/types";
import { AccountActions } from "../account/actions";

export const SnapshotActions = {
  import(file: File | ISnapshot) {
    return async (dispatch: IDispatch) => {
      const account = await SnapshotService.select(file);
      await dispatch(AccountActions.load());
      return dispatch(SnapshotActions.load(account));
    };
  },
  reset() {
    return (dispatch: IDispatch) => {
      dispatch({
        type: ACTION_SNAPSHOT_SET_CURRENT,
        payload: null
      });
    };
  },
  load(account: IAccount) {
    const path = AccountService.getAccountPath(account.id);
    return async (dispatch: IDispatch) => {
      const snapshot = await HttpClient.get<IAccount>(
        `/api${path}/snapshot`
      ).then(res => res.data);
      dispatch({
        type: ACTION_SNAPSHOT_SET_CURRENT,
        payload: snapshot
      });
      return account;
    };
  }
};
