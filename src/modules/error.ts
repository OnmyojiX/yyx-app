import { IAction } from "../store";

export interface IState {
  currentError: Error | null;
}

const initialState: IState = {
  currentError: null
};

export enum ActionType {
  SetError = "ERROR_SET_ERROR"
}

export function reducer(state = initialState, action: IAction<ActionType>) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SetError:
      return {
        ...state,
        currentError: payload
      };
  }
  return state;
}

export const ErrorActions = {
  setError(error: Error) {
    return {
      type: ActionType.SetError,
      payload: error
    };
  },
  clearError() {
    return {
      type: ActionType.SetError,
      payload: null
    };
  }
};
