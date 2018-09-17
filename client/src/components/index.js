import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.scss";
import { AuthenticatedRoute, TokenAuthUser } from "./global";
import LandingPage from "./LandingPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import CreateTeamPage from "./CreateTeamPage";
import WorkSpacePage from "./WorkSpacePage";
import ErrorPage from "./ErrorPage";
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
      <ErrorPage />
    ) : (
      <BrowserRouter>
        <React.Fragment>
          {/* try to log in user automatically if token exist in local storage */}
          <TokenAuthUser />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <AuthenticatedRoute
              exact
              path="/create-team"
              component={CreateTeamPage}
            />
            <AuthenticatedRoute
              exact
              path="/workspace/:teamId?/:channelId?"
              component={WorkSpacePage}
            />
            <Route exact path="/:unfoundLocation" component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Router;
