import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import Home  from "../Home/index";
import Task from "../Task/index";

const App = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/addTask/:id" component={Task} />
    </Switch>
  );
};

export default withRouter(App);
