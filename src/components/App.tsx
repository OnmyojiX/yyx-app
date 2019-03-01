import React, { SFC, useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";

import { IYyxState } from "../store";

import { Main } from "./Main/Main";
import { SnapshotSelectScreen } from "./Snapshot/SnapshotSelectScreen";

import { SnapshotActions, ISnapshotInfo } from "../modules/snapshot";

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
    main = <Main />;
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
