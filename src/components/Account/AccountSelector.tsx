import React, { SyntheticEvent, useState } from "react";
import "./AccountSelector.scss";

import { IAccountInfo, AccountId } from "../../modules/account/types";
import { AccountService } from "../../modules/account/service";
import { getServerName } from "../../modules/server/data";
import { formatUtcDate } from "../../utils";
import {
  Icon,
  Classes,
  Button,
  Dialog,
  Alert,
  Intent,
  Card
} from "@blueprintjs/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AccountActions } from "../../modules/account/actions";
export interface Props {
  accounts: IAccountInfo[];
}

export const AccountSelectorImpl: React.SFC<Props & RouteComponentProps> = ({
  accounts,
  history
}) => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState<IAccountInfo | null>(null);

  const open = (id: AccountId) => {
    history.push(AccountService.getAccountPath(id));
  };

  const close = (id: AccountId) => {
    dispatch(AccountActions.close(id));
  };

  const remove = (id: AccountId) => {
    dispatch(AccountActions.remove(id));
    setDeleting(null);
  };

  return (
    <div className="account-selector">
      <table className="bp3-html-table bp3-interactive">
        <thead>
          <tr>
            <th>用户名</th>
            <th>服务器</th>
            <th>等级</th>
            <th>最近快照</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a, i) => {
            const serverName =
              a.id.type === "Yyx" ? getServerName(a.id.server_id) : "藏宝阁";
            return (
              <tr key={i} onClick={() => open(a.id)}>
                <td className="name">
                  <Icon
                    icon="user"
                    className={a.state ? "" : "inactive"}
                    intent={a.state ? "success" : "none"}
                  />
                  &nbsp;
                  {a.name}
                </td>
                <td>{serverName}</td>
                <td>{a.level}级</td>
                <td>{formatUtcDate(a.latest_snapshot_date)}</td>
                <td>
                  {a.state && (
                    <Button
                      disabled={a.state.busy}
                      onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                        close(a.id);
                      }}
                    >
                      关闭
                    </Button>
                  )}
                  {!a.state && (
                    <Button
                      intent="danger"
                      onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                        setDeleting(a);
                      }}
                    >
                      删除
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Alert
        cancelButtonText="取消"
        confirmButtonText="确认删除"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={!!deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && remove(deleting.id)}
      >
        {deleting && (
          <p>
            确认删除账号 <strong>{deleting.name}</strong> ?
          </p>
        )}
      </Alert>
    </div>
  );
};

export const AccountSelector = withRouter(AccountSelectorImpl);
