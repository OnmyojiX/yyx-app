import { IDispatch } from "../../store";

import { HttpClient } from "../http";

import {
  ACTION_ACCOUNT_SET_ERROR,
  ACTION_ACCOUNT_SET_LOADING,
  ACTION_ACCOUNT_SET_ACCOUNTS,
  ACTION_ACCOUNT_SELECT,
  ACTION_ACCOUNT_SET_ACTIVE_STATES,
  ACTION_ACCOUNT_DELETE_ID
} from "./constants";
import { AccountId } from "./types";
import { AccountService } from "./service";
import { batch } from "react-redux";

async function loadActive() {
  return HttpClient.get("/api/active-account").then(res => {
    return res.data;
  });
}

function load() {
  return async (dispatch: IDispatch) => {
    dispatch({
      type: ACTION_ACCOUNT_SET_ERROR,
      payload: null
    });
    dispatch({
      type: ACTION_ACCOUNT_SET_LOADING,
      payload: true
    });
    try {
      const [accounts, states] = await Promise.all([
        HttpClient.get("/api/account").then(res => res.data),
        loadActive()
      ]);
      batch(() => {
        dispatch({
          type: ACTION_ACCOUNT_SET_ACCOUNTS,
          payload: accounts
        });
        dispatch({
          type: ACTION_ACCOUNT_SET_ACTIVE_STATES,
          payload: states
        });
      });
    } catch (e) {
      dispatch({
        type: ACTION_ACCOUNT_SET_ERROR,
        payload: e
      });
    }
    dispatch({
      type: ACTION_ACCOUNT_SET_LOADING,
      payload: false
    });
  };
}

function loadId(id: AccountId) {
  return async (dispatch: IDispatch) => {
    dispatch({
      type: ACTION_ACCOUNT_SET_ERROR,
      payload: null
    });
    dispatch({
      type: ACTION_ACCOUNT_SET_LOADING,
      payload: true
    });
    try {
      let path = AccountService.getAccountPath(id);
      const [accounts, states] = await Promise.all([
        HttpClient.get(`/api/account${path}`).then(res => {
          return res.data ? [res.data] : [];
        }),
        loadActive()
      ]);
      batch(() => {
        dispatch({
          type: ACTION_ACCOUNT_SET_ACCOUNTS,
          payload: accounts
        });
        dispatch({
          type: ACTION_ACCOUNT_SET_ACTIVE_STATES,
          payload: states
        });
      });
    } catch (e) {
      dispatch({
        type: ACTION_ACCOUNT_SET_ERROR,
        payload: e
      });
    }
    dispatch({
      type: ACTION_ACCOUNT_SET_LOADING,
      payload: false
    });
  };
}

function select(id: AccountId) {
  return {
    type: ACTION_ACCOUNT_SELECT,
    payload: id
  };
}

export const AccountActions = {
  select,
  load,
  loadId,
  loadAndSelectId(id: AccountId) {
    return async (dispatch: IDispatch) => {
      await dispatch(loadId(id));
      dispatch(select(id));
    };
  },
  close(id: AccountId) {
    const path = AccountService.getAccountPath(id);
    return async (dispatch: IDispatch) => {
      try {
        await HttpClient.put(`/api/account${path}/close`);
        dispatch({
          type: ACTION_ACCOUNT_SET_ACTIVE_STATES,
          payload: await loadActive()
        });
      } catch (e) {
        dispatch({
          type: ACTION_ACCOUNT_SET_ERROR,
          payload: e
        });
      }
    };
  },
  remove(id: AccountId) {
    const path = AccountService.getAccountPath(id);
    return async (dispatch: IDispatch) => {
      try {
        await HttpClient.delete(`/api/account${path}`);
        dispatch({
          type: ACTION_ACCOUNT_DELETE_ID,
          payload: id
        });
      } catch (e) {
        dispatch({
          type: ACTION_ACCOUNT_SET_ERROR,
          payload: e
        });
      }
    };
  }
};
