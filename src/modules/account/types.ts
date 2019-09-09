export type AccountId = YyxAccountId | CbgAccountId;

export interface YyxAccountId {
  type: "Yyx";
  server_id: number;
  player_id: number;
}

export interface CbgAccountId {
  type: "Cbg";
  server_id: string;
  order_sn: string;
}

export interface IAccount {
  id: YyxAccountId | CbgAccountId;
  local_id: number;
  name: string;
  level: string;
  latest_snapshot_date: string;
  created_at: string;
}

export interface IAccountActiveState {
  id: AccountId;
  path: string;
  busy: boolean;
}

export interface IAccountInfo extends IAccount {
  state?: IAccountActiveState;
  path: string;
}
