import { createStore, combineReducers } from "redux";

import { home } from "./reducers";
import { task } from "./reducers"

const reducers = combineReducers({
  home,
  task
});

const store = createStore(reducers);

export default store;
