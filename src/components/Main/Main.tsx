import React, { SFC, ComponentClass, useEffect } from "react";
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
  Popover,
  Callout,
  Spinner
} from "@blueprintjs/core";

import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  withRouter,
  Redirect
} from "react-router-dom";
import { YyxStore } from "../../store";
import { OverviewPage } from "../Overview/OverviewPage";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { ISnapshot } from "../../interfaces";

import { HeroPage } from "../Hero/HeroPage";
import { EquipPage } from "../Equip/EquipPage";
import { RealmCardPage } from "../RealmCard/RealmCardPage";
import { UpdateInfo } from "../Update/UpdateInfo";
import { About } from "../About/About";
import { useSelector, useDispatch } from "react-redux";
import { SnapshotSelectors } from "../../modules/snapshot/selectors";
import { SnapshotActions } from "../../modules/snapshot/actions";
import {
  YyxAccountId,
  CbgAccountId,
  AccountId
} from "../../modules/account/types";
import { AccountActions } from "../../modules/account/actions";
import { AccountSelectors } from "../../modules/account/selectors";
import { AccountService } from "../../modules/account/service";

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

const Main: SFC<{
  id: AccountId;
  route: RouteComponentProps;
}> = ({ id, route }) => {
  const accountPath = AccountService.getAccountPath(id);

  const dispach = useDispatch();
  const account = useSelector(AccountSelectors.current);
  const notFound = useSelector(AccountSelectors.currentNotFound);
  useEffect(() => {
    dispach(AccountActions.loadAndSelectId(id));
  }, [accountPath]);
  useEffect(() => {
    if (account && AccountService.getAccountPath(account.id) === accountPath) {
      dispach(SnapshotActions.load(account));
    } else {
      dispach(SnapshotActions.reset());
    }
  }, [account]);
  const current = useSelector(SnapshotSelectors.currentSnapshot);
  const exportUrl = React.useMemo(() => {
    if (!current) {
      return null;
    }
    const ts = Math.floor(new Date(current.timestamp).getTime() / 1000);
    if (current.cbg_url) {
      const name = `yyx_snapshot_cbg_${current.data.player.name}.json`;
      return `/api${accountPath}/snapshot-export/${encodeURIComponent(name)}`;
    } else {
      return `/api${accountPath}/snapshot-export/yyx_snapshot_${ts}_${current.data.player.server_id}_${current.data.player.id}.json`;
    }
  }, [current]);

  if (notFound) {
    return (
      <Callout intent="warning">
        账号快照不存在。
        <Link to="/">
          <Button>重新选择</Button>
        </Link>
      </Callout>
    );
  }

  if (!current) {
    return (
      <div style={{ marginTop: "20%" }}>
        <Spinner />
      </div>
    );
  }

  const path = route.location.pathname;
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
                  <span>
                    {info.data.player.name}
                    {info.cbg_url && (
                      <>
                        &nbsp;
                        <a href={info.cbg_url} target="_blank">
                          [藏宝阁]
                        </a>
                      </>
                    )}
                  </span>
                  <NavbarDivider />
                  <ButtonGroup large>
                    {routes.map((r, i) => {
                      const rpath = accountPath + r.path;
                      return r.show(info) ? (
                        <Button
                          key={i}
                          onClick={() => route.history.push(rpath)}
                          active={
                            r.path === "/"
                              ? path === rpath
                              : path.startsWith(rpath)
                          }
                          text={r.renderLabel(info)}
                        />
                      ) : null;
                    })}
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
                导出当前快照
              </a>
              <NavbarDivider />
            </>
          )}
          <Button
            icon="folder-open"
            onClick={() => {
              route.history.push("/");
            }}
          >
            打开其他快照
          </Button>
        </NavbarGroup>
      </Navbar>
      <div className="yyx-container">
        {routes.map((r, i) => (
          <Route
            key={i}
            path={route.match.path + r.path}
            component={r.component}
            exact={r.path === "/"}
          />
        ))}
      </div>
    </main>
  );
};

export const YyxMain = withRouter(props => {
  const id = {
    type: "Yyx",
    server_id: Number(props.match.params["serverId"]),
    player_id: Number(props.match.params["playerId"])
  } as YyxAccountId;
  return <Main id={id} route={props} />;
});
export const CbgMain = withRouter(props => {
  const id = {
    type: "Cbg",
    server_id: props.match.params["serverId"],
    order_sn: props.match.params["orderSn"]
  } as CbgAccountId;
  return <Main id={id} route={props} />;
});
