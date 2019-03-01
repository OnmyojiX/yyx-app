import React, { SFC, ComponentClass } from "react";
import "./Main.scss";
import logo from "../../assets/logo.svg";
import pkg from "../../../package.json";

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  ButtonGroup
} from "@blueprintjs/core";

import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { YyxStore } from "../../store";
import { SnapshotActions, ISnapshotInfo } from "../../modules/snapshot";
import { OverviewPage } from "../Overview/OverviewPage";
import { HeroPage } from "../Hero/HeroPage";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";

const routes = [
  {
    path: "/",
    component: OverviewPage,
    renderLabel: () => "概况"
  },
  {
    path: "/hero",
    component: HeroPage,
    renderLabel: (snapshot: ISnapshotInfo) => `式神 (${snapshot.heroes})`
  },
  {
    path: "/equip",
    component: HeroPage,
    renderLabel: (snapshot: ISnapshotInfo) => `御魂 (${snapshot.hero_equips})`
  }
];

const Render: SFC<RouteComponentProps> = props => {
  const path = props.location.pathname;
  return (
    <main>
      <Navbar fixedToTop>
        <NavbarGroup align={Alignment.LEFT}>
          <a className="navbar-left">
            <img className="logo" src={logo} />
          </a>
          <NavbarDivider />
          <SnapshotInfo
            render={info =>
              info && (
                <ButtonGroup>
                  {routes.map((r, i) => (
                    <Button
                      key={i}
                      onClick={() => props.history.push(r.path)}
                      active={path === r.path}
                      text={r.renderLabel(info)}
                    />
                  ))}
                </ButtonGroup>
              )
            }
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <span className="bp3-text-muted">{pkg.version}</span>
          <NavbarDivider />
          <Button
            icon="folder-open"
            onClick={() => {
              YyxStore.dispatch(SnapshotActions.resetCurrent());
            }}
          >
            打开其他快照
          </Button>
        </NavbarGroup>
      </Navbar>
      <div className="yyx-container">
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.path === "/"}
            component={route.component}
          />
        ))}
      </div>
    </main>
  );
};

const LayoutImpl = withRouter(Render);

export const Main: SFC = props => {
  return (
    <Router>
      <LayoutImpl {...props} />
    </Router>
  );
};
