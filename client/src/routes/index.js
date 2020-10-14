import React from "react";
import { Switch, Route } from "react-router-dom";

import Jenosize from "../components/Jenosize";
import Game24 from "../components/Game24";
import GameXO from "../components/GameXO";

export default () => (
  <Switch>
    <Route exact path="/" component={Jenosize} />
    <Route exact path="/game24" component={Game24} />
    <Route exact path="/gameXO" component={GameXO} />
  </Switch>
);
