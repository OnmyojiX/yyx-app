import { AccountId } from "./types";

export const AccountService = {
  getAccountPath: (id: AccountId) => {
    switch (id.type) {
      case "Yyx": {
        return `/yyx/${id.server_id}/${id.player_id}`;
      }
      case "Cbg": {
        return `/cbg/${id.server_id}/${id.order_sn}`;
      }
    }
  }
};
