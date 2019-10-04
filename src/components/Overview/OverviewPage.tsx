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
              <li>功勋: {currency.contrib}</li>
              <li>御灵境之钥: {currency.totem_pass}</li>
              <li>魂玉: {currency.s_jade}</li>
              <li>皮肤券: {currency.skin_token}</li>
              <li>突破券: {currency.realm_raid_pass}</li>
              <li>破碎的符咒: {currency.broken_amulet}</li>
              <li>神秘的符咒: {currency.mystery_amulet}</li>
              <li>现世符咒: {currency.ar_amulet}</li>
              <li>御札: {currency.ofuda}</li>
              <li>金御札: {currency.gold_ofuda}</li>
              <li>八岐大蛇鳞片: {currency.scale}</li>
              <li>大蛇的逆鳞: {currency.reverse_scale}</li>
              <li>逢魔之魂: {currency.demon_soul}</li>
              <li>痴念之卷: {currency.foolery_pass}</li>
              <li>SP皮肤券: {currency.sp_skin_token}</li>
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
