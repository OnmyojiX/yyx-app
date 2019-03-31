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
    <table className="bp3-html-table bp3-html-table-striped yyx-prop-table">
      <tbody>
        <tr>
          <td>快照版本</td>
          <td>{info.version}</td>
        </tr>
        <tr>
          <td>快照日期</td>
          <td>{formatDate(info.timestamp)}</td>
        </tr>
        <tr>
          <td>玩家</td>
          <td>
            {player.name} Lv.{player.level}
          </td>
        </tr>
        <tr>
          <td>资产</td>
          <td>
            <ul className="bp3-list-unstyled">
              <li>金币: {currency.coin}</li>
              <li>勾玉: {currency.jade}</li>
              <li>体力: {currency.action_point}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>式神数量</td>
          <td>{heroes.length}</td>
        </tr>
        <tr>
          <td>御魂数量</td>
          <td>{hero_equips.length}</td>
        </tr>
      </tbody>
    </table>
  );
};

const OverviewPage: SFC = props => {
  return <SnapshotInfo render={render} />;
};

export { OverviewPage };
