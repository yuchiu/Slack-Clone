import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class AuthenticatedRoute extends React.Component {
  render() {
    const { isUserLoggedIn, component: Component, ...rest } = this.props;
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
const stateToProps = state => ({
  isUserLoggedIn: state.userReducer.isUserLoggedIn
});
export default connect(
  stateToProps,
  null
)(AuthenticatedRoute);
