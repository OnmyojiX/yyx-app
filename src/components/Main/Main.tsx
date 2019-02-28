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
import { SnapshotActions } from "../../modules/snapshot";

export interface MainProps {
  routes: Array<{
    path: string;
    label: string;
    component: SFC | ComponentClass;
  }>;
}

const Render: SFC<MainProps & RouteComponentProps> = props => {
  const path = props.location.pathname;
  return (
    <main>
      <Navbar fixedToTop>
        <NavbarGroup align={Alignment.LEFT}>
          <a className="navbar-left">
            <img className="logo" src={logo} />
          </a>
          <NavbarDivider />
          <ButtonGroup>
            {props.routes.map((route, i) => (
              <Link key={i} to={route.path}>
                <Button
                  className={Classes.MINIMAL}
                  active={path === route.path}
                  text={route.label}
                />
              </Link>
            ))}
          </ButtonGroup>
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
        {props.routes.map((route, i) => (
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

export const Main: SFC<MainProps> = props => {
  return (
    <Router>
      <LayoutImpl {...props} />
    </Router>
  );
};
