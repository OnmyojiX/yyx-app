import React, { SFC } from "react";
import "./OverviewPage.scss";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { ISnapshotInfo } from "../../modules/snapshot";
import * as dateFns from "date-fns";
import { Card } from "@blueprintjs/core";

const render = (info: ISnapshotInfo | null) => {
  if (!info) {
    return null;
  }
  return (
    <Card>
      <table className="bp3-html-table yyx-prop-table">
        <tbody>
          <tr>
            <th>快照日期</th>
            <td>{dateFns.format(info.timestamp, "YYYY-MM-DD HH:mm")}</td>
          </tr>
          <tr>
            <th>玩家</th>
            <td>
              {info.player.name} Lv.{info.player.level}
            </td>
          </tr>
          <tr>
            <th>资产</th>
            <td>
              <ul>
                <li>金币: {info.currency.coin}</li>
                <li>勾玉: {info.currency.jade}</li>
                <li>体力: {info.currency.action_point}</li>
              </ul>
            </td>
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
    </Card>
  );
};

const OverviewPage: SFC = props => {
  return <SnapshotInfo render={render} />;
};

export { OverviewPage };
