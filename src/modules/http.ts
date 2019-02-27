import axios, { AxiosResponse } from "axios";
import { YyxStore } from "../store";
import { ErrorActions } from "./error";

export const HttpClient = axios.create();

HttpClient.interceptors.response.use(
  res => res,
  err => {
    const error = err.response ? extractError(err.response) : err;
    YyxStore.dispatch(ErrorActions.setError(error));
    return Promise.reject(error);
  }
);

function extractError(res: AxiosResponse) {
  if (res.data && res.data.message) {
    return new Error(res.data.message);
  }
  return new Error(`未知错误 (HTTP ${res.status})`);
}
