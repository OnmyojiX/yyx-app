import { useSelector } from "react-redux";
import { AccountSelectors } from "./selectors";
import { AccountService } from "./service";

export const useAccountPath = () => {
  const account = useSelector(AccountSelectors.current);
  return account ? AccountService.getAccountPath(account.id) : null;
};
