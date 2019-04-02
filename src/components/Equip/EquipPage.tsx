import React, { SFC } from "react";
import "./EquipPage.scss";
import { SubNavLink, SubNav } from "../Common/SubNav";
import { EquipList } from "./EquipList";
import { Route } from "react-router";
import { EquipPresets } from "./EquipPresets";

const SubPages: (SubNavLink & { component: any })[] = [
  {
    label: "御魂列表",
    to: "/equip",
    component: EquipList
  },
  {
    label: "御魂方案",
    to: "/equip/preset",
    component: EquipPresets
  }
];

export const EquipPage: SFC = props => {
  return (
    <div className="yyx-full-height yyx-layout row">
      <div className="item yyx-nav-left">
        <SubNav links={SubPages} />
      </div>
      <div className="item yyx-content yyx-content-scroll">
        {SubPages.map(page => (
          <Route
            key={page.to}
            path={page.to}
            exact={page.to === "/equip"}
            component={page.component}
          />
        ))}
      </div>
    </div>
  );
};
