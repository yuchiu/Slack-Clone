import React from "react";
import { Route, Redirect } from "react-router-dom";
import { sessionStore } from "@/utils/";

class AuthenticatedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const isUserLoggedIn = sessionStore.getLoginStatus();
    return (
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
  }
}

export default AuthenticatedRoute;
