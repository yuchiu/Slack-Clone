import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { validateForm } from "@/utils";
import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/selectors";
import LoginPage from "./LoginPage.jsx";

class LoginPageContainer extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      password: ""
    }
  };

  componentDidMount() {
    const { clearAllError } = this.props;
    // clearAllError();
    this.setState({
      clientErrors: {},
      credentials: {
        username: "",
        password: ""
      }
    });
  }

  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;

    this.setState({
      credentials
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const { credentials } = this.state;

    const clientErrors = validateForm.login(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { fetchLoginUser } = this.props;
      fetchLoginUser(credentials);
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserLoggedIn, error } = this.props;
    return (
      <LoginPage
        clientErrors={clientErrors}
        credentials={credentials}
        isUserLoggedIn={isUserLoggedIn}
        error={error}
        handleLogin={this.handleLogin}
        handleChange={this.handleChange}
        redirectToRegister={this.redirectToRegister}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  history: PropTypes.object.isRequired,
  fetchLoginUser: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string
};

const stateToProps = state => ({
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => dispatch(errorAction.clearAllError()),
  fetchLoginUser: credential => {
    dispatch(userAction.fetchLoginUser(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPageContainer);
