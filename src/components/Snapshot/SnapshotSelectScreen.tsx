import React, {
  SFC,
  ChangeEvent,
  FormEventHandler,
  useState,
  useEffect
} from "react";
import "./SnapshotSelectScreen.scss";
import logo from "../../assets/logo.svg";
import {
  FileInput,
  Callout,
  Spinner,
  Button,
  Divider,
  Dialog
} from "@blueprintjs/core";
import { YyxStore, IDispatch } from "../../store";
import { OpenCbgUrl } from "./OpenCbgUrl";
import { IAccount } from "../../modules/account/types";
import { useDispatch, useSelector } from "react-redux";
import { SnapshotActions } from "../../modules/snapshot/actions";
import { version } from "../../../package.json";
import { AccountSelector } from "../Account/AccountSelector";
import { AccountSelectors } from "../../modules/account/selectors";
import { AccountActions } from "../../modules/account/actions";
import { AccountService } from "../../modules/account/service";
import { withRouter, RouteComponentProps } from "react-router-dom";

const SnapshotSelectScreenImpl: React.SFC<RouteComponentProps> = ({
  history
}) => {
  const dispatch = useDispatch<IDispatch>();
  const loadingAccounts = useSelector(AccountSelectors.loading);
  const loadAccountsError = useSelector(AccountSelectors.error);
  const accounts = useSelector(AccountSelectors.accounts);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [openCbg, setOpenCbg] = useState(false);

  useEffect(() => {
    dispatch(SnapshotActions.reset());
    dispatch(AccountActions.load());
  }, []);

  const handleAccountOpen = (account: IAccount) => {
    const path = AccountService.getAccountPath(account.id);
    history.push(path);
  };

  const handleSelectFile: FormEventHandler<HTMLInputElement> = e => {
    const { files } = e.target as any;
    if (files.length) {
      setError(null);
      setLoading(true);
      dispatch(SnapshotActions.import(files[0]))
        .then(account => {
          handleAccountOpen(account);
        })
        .catch((err: Error) => {
          setLoading(false);
          setError(err);
        });
    }
  };

  if (loadingAccounts) {
    return (
      <div style={{ marginTop: "20%" }}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="snapshot-select-screen">
        <div className="left">
          <div className="bp3-non-ideal-state-visual">
            <img src={logo} className="logo" />
          </div>
          <div className="bp3-text-small bp3-text-muted">v{version}</div>
          <br />
          {error && (
            <Callout title="打开快照失败" intent="danger">
              {error.message}
            </Callout>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FileInput text="导入快照文件" onInputChange={handleSelectFile} />
              <br />
              <br />
              <Button minimal intent="primary" onClick={() => setOpenCbg(true)}>
                打开藏宝阁网址
              </Button>
            </>
          )}
        </div>
        {/* <Divider className="divider" /> */}
        <div className="right">
          {loadAccountsError && (
            <Callout title="读取账户列表失败" intent="danger">
              {loadAccountsError.message}
            </Callout>
          )}
          <AccountSelector accounts={accounts} />
        </div>
      </div>
      <OpenCbgUrl
        open={openCbg}
        onClose={() => setOpenCbg(false)}
        onOpenAccount={handleAccountOpen}
      />
    </>
  );
};

export const SnapshotSelectScreen = withRouter(SnapshotSelectScreenImpl);
