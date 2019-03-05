import React, { SFC, useState } from "react";
import "./RealmCardPage.scss";
import { connect } from "react-redux";
import { IYyxState } from "../../store";
import { RealmCardSelectors, IRealmCardGroup } from "../../modules/realm_card";

const Render: SFC<{
  groups: IRealmCardGroup[] | null;
}> = props => {
  if (!props.groups) {
    return null;
  }

  const columns = [];
  const rows = [];
  for (let i = 0; i < 6; i++) {
    columns.push(<th key={i}>{6 - i}星</th>);
  }

  for (let g of props.groups) {
    rows.push(
      <tr key={g.name}>
        <td>
          <strong>{g.name}</strong>
        </td>
        {columns.map((c, idx) => {
          const gi = g.items.find(i => i.star === 6 - idx);
          return <td key={idx}>{gi ? gi.count : 0}</td>;
        })}
      </tr>
    );
  }

  return (
    <>
      <table className="bp3-html-table bp3-html-table-striped">
        <thead>
          <tr>
            <th>结界卡</th>
            {columns}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export const RealmCardPage = connect((state: IYyxState) => ({
  groups: RealmCardSelectors.selectGroups(state)
}))(Render);
