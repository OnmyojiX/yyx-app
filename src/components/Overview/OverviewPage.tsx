import React, { SFC } from "react";
import "./OverviewPage.scss";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { ISnapshotInfo } from "../../modules/snapshot";
import * as dateFns from "date-fns";

const render = (info: ISnapshotInfo | null) => {
  if (!info) {
    return null;
  }
  return (
    <table className="bp3-html-table yyx-prop-table">
      <tbody>
        <tr>
          <th>快照日期</th>
          <td>{dateFns.format(info.timestamp, "YYYY-MM-DD HH:mm")}</td>
        </tr>
        <tr>
          <th>式神数量</th>
          <td>{info.heroes}</td>
        </tr>
        <tr>
          <th>御魂数量</th>
          <td>{info.hero_equips}</td>
        </tr>
      </tbody>
    </table>
  );
};

const OverviewPage: SFC = props => {
  return <SnapshotInfo render={render} />;
};

export { OverviewPage };
