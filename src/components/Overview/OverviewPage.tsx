import React, { SFC } from "react";
import "./OverviewPage.scss";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { Card } from "@blueprintjs/core";
import { ISnapshot } from "../../interfaces";
import { formatDate } from "../../utils";

const render = (info: ISnapshot | null) => {
  if (!info) {
    return null;
  }

  const { player, currency, heroes, hero_equips } = info.data;

  return (
    <Card>
      <table className="bp3-html-table yyx-prop-table">
        <tbody>
          <tr>
            <th>快照版本</th>
            <td>{info.version}</td>
          </tr>
          <tr>
            <th>快照日期</th>
            <td>{formatDate(info.timestamp)}</td>
          </tr>
          <tr>
            <th>玩家</th>
            <td>
              {player.name} Lv.{player.level}
            </td>
          </tr>
          <tr>
            <th>资产</th>
            <td>
              <ul>
                <li>金币: {currency.coin}</li>
                <li>勾玉: {currency.jade}</li>
                <li>体力: {currency.action_point}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>式神数量</th>
            <td>{heroes.length}</td>
          </tr>
          <tr>
            <th>御魂数量</th>
            <td>{hero_equips.length}</td>
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
