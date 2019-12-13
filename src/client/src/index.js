import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';
import { App } from "./components";
import * as serviceWorker from "./serviceWorker";

import { Route, Switch, Router } from "react-router-dom";
import store from './store';

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
