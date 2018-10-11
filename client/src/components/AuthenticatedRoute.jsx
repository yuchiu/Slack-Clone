import React from "react";
import { Route, Redirect } from "react-router-dom";
import { sessionStore } from "@/utils/";

const isUserLoggedIn = sessionStore.getLoginStatus();

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
export default AuthenticatedRoute;
