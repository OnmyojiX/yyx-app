import React, { SFC, useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";

import { SnapshotSelectScreen } from "./Snapshot/SnapshotSelectScreen";
import { BrowserRouter, Route } from "react-router-dom";
import { CbgMain, YyxMain } from "./Main/Main";

const App: SFC = props => {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={SnapshotSelectScreen} />
      <Route path="/yyx/:serverId/:playerId" component={YyxMain} />
      <Route path="/cbg/:serverId/:orderSn" component={CbgMain} />
    </BrowserRouter>
  );
};

export default App;
