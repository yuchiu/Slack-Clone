import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.scss";
import { AuthRoute } from "./global";
import LandingPage from "./LandingPage";
import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";

class Router extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
      <h2>Error occured while rendering this page</h2>
    ) : (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <AuthRoute exact path="/testing" component={TestingPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Router;
