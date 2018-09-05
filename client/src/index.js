import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "@/stores";
import Router from "@/components";

const app = (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
