import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends React.Component {
  render() {
    const { isUserAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isUserAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    );
  }
}
const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated
});
export default connect(
  stateToProps,
  null
)(AuthRoute);
