import React, { SFC, useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";

import { IYyxState } from "../store";

import { Main } from "./Main/Main";
import { OverviewPage } from "./Overview/OverviewPage";
import { HeroPage } from "./Hero/HeroPage";
import { SnapshotSelectScreen } from "./Snapshot/SnapshotSelectScreen";

import { SnapshotActions, ISnapshotInfo } from "../modules/snapshot";

const routes = [
  {
    path: "/",
    component: OverviewPage,
    label: "概况"
  },
  {
    path: "/hero",
    component: HeroPage,
    label: "式神"
  },
  {
    path: "/hero-equip",
    component: HeroPage,
    label: "御魂"
  },
  {
    path: "/about",
    component: HeroPage,
    label: "关于"
  }
];

const AppRender: SFC<{
  snapshot: ISnapshotInfo | null;
  notSelected: boolean;
  load: () => void;
}> = props => {
  useEffect(() => {
    props.load();
  }, []);

  let main;

  if (props.snapshot) {
    main = <Main routes={routes} />;
  } else {
    main = <SnapshotSelectScreen />;
  }

  return <>{main}</>;
};

const App = connect(
  (state: IYyxState) => {
    return {
      snapshot: state.snapshot.current,
      notSelected: state.snapshot.currentNotSelected
    };
  },
  dispatch => {
    return {
      load: () => dispatch(SnapshotActions.loadCurrent() as any)
    };
  }
)(AppRender);

export default App;
