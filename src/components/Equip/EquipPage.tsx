import React, { SFC } from "react";
import "./EquipPage.scss";
import { SubNavLink, SubNav } from "../Common/SubNav";
import { EquipList } from "./EquipList";
import { Route } from "react-router";

const SubPages: (SubNavLink & { component: any })[] = [
  {
    label: "御魂列表",
    to: "/equip",
    component: EquipList
  }
];

export const EquipPage: SFC = props => {
  return (
    <>
      <div className="yyx-layout row">
        <div className="item yyx-nav-left">
          <SubNav links={SubPages} />
        </div>
        <div className="item yyx-content">
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
    </>
  );
};
