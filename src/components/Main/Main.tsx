import React, { SFC, ComponentClass } from "react";
import "./Main.scss";
import logo from "../../assets/logo.svg";

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  ButtonGroup,
  Popover
} from "@blueprintjs/core";

import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { YyxStore } from "../../store";
import { SnapshotActions, SnapshotSelectors } from "../../modules/snapshot";
import { OverviewPage } from "../Overview/OverviewPage";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { ISnapshot } from "../../interfaces";

import { HeroPage } from "../Hero/HeroPage";
import { EquipPage } from "../Equip/EquipPage";
import { RealmCardPage } from "../RealmCard/RealmCardPage";
import { UpdateInfo } from "../Update/UpdateInfo";
import { About } from "../About/About";
import { useSelector } from "react-redux";

const routes = [
  {
    path: "/",
    component: OverviewPage,
    renderLabel: () => "概况",
    show: (_: ISnapshot) => true
  },
  {
    path: "/hero",
    component: HeroPage,
    renderLabel: (snapshot: ISnapshot) =>
      `式神 (${snapshot.data.heroes.length})`,
    show: (s: ISnapshot) => !s.cbg_url
  },
  {
    path: "/equip",
    component: EquipPage,
    renderLabel: (snapshot: ISnapshot) =>
      `御魂 (${snapshot.data.hero_equips.length})`,
    show: (s: ISnapshot) => true
  },
  {
    path: "/realm-card",
    component: RealmCardPage,
    renderLabel: (snapshot: ISnapshot) =>
      `结界卡 (${snapshot.data.realm_cards.length})`,
    show: (s: ISnapshot) => !s.cbg_url
  }
];

const Render: SFC<RouteComponentProps> = props => {
  const current = useSelector(SnapshotSelectors.selectCurrentSnapshot);
  const exportUrl = React.useMemo(() => {
    if (!current) {
      return null;
    }
    const ts = Math.floor(new Date(current.timestamp).getTime() / 1000);
    if (current.cbg_url) {
      const name = `yyx_snapshot_cbg_${current.data.player.name}.json`;
      return `/api/snapshot-export/${encodeURIComponent(name)}`;
    } else {
      return `/api/snapshot-export/yyx_snapshot_${ts}_${current.data.player.server_id}_${current.data.player.id}.json`;
    }
  }, [current]);

  const path = props.location.pathname;
  return (
    <main>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <a className="navbar-left">
            <img className="logo" src={logo} />
          </a>
          <NavbarDivider />
          <SnapshotInfo
            render={info =>
              info && (
                <>
                  <span>{info.data.player.name}</span>
                  <NavbarDivider />
                  <ButtonGroup large>
                    {routes.map((r, i) =>
                      r.show(info) ? (
                        <Button
                          key={i}
                          onClick={() => props.history.push(r.path)}
                          active={
                            r.path === "/"
                              ? path === "/"
                              : path.startsWith(r.path)
                          }
                          text={r.renderLabel(info)}
                        />
                      ) : null
                    )}
                  </ButtonGroup>
                </>
              )
            }
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <UpdateInfo />
          <NavbarDivider />
          <Popover>
            <Button minimal>关于</Button>
            <About />
          </Popover>
          <NavbarDivider />
          {exportUrl && (
            <>
              <a href={exportUrl} target="_blank">
                下载当前快照
              </a>
              <NavbarDivider />
            </>
          )}
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
