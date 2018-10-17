import React from "react";
import { Route, Redirect } from "react-router-dom";
import { sessionStore } from "@/utils/";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStore.getLoginStatus() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);
export default AuthenticatedRoute;
