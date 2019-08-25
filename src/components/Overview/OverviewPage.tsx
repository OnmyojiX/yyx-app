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
        {info.cbg_url && (
          <tr>
            <td>藏宝阁地址</td>
            <td>
              <a target="_blank" href={info.cbg_url}>
                {info.cbg_url}
              </a>
            </td>
          </tr>
        )}
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
              <li>樱饼: {currency.auto_point}</li>
              <li>荣誉: {currency.honor}</li>
              <li>勋章: {currency.medal}</li>
              {!info.cbg_url && <li>功勋: {currency.contrib}</li>}
              <li>御灵境之钥: {currency.totem_pass}</li>
              <li>魂玉: {currency.s_jade}</li>
              <li>皮肤券: {currency.skin_token}</li>
              {!info.cbg_url && <li>突破券: {currency.realm_raid_pass}</li>}
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
