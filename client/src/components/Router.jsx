import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./Router.scss";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LandingPage from "./LandingPage/LandingPage.jsx";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import CreateTeamPage from "./CreateTeamPage/CreateTeamPage";
import WorkSpacePage from "./WorkSpacePage/WorkSpacePage";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";

const Router = ({ hasError }) =>
  hasError ? (
    <ErrorPage />
  ) : (
    <HashRouter>
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
    </HashRouter>
  );

export default Router;
