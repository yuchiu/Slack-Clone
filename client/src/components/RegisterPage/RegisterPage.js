import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { validateForm } from "@/utils";
import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/selectors";
import RegisterPage from "./RegisterPage.jsx";

class RegisterPageContainer extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;
    this.setState({
      credentials
    });
    if (credentials.password !== credentials.confirmPassword) {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword =
        "Password and Confirm Password don't match.";
      this.setState({ clientErrors });
    } else {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword = "";
      this.setState({ clientErrors });
    }
  };

  handleRegister = e => {
    e.preventDefault();

    const {
      credentials,
      credentials: { username, email, password, confirmPassword }
    } = this.state;

    if (password === confirmPassword) {
      const clientErrors = validateForm.register(credentials);
      this.setState({ clientErrors });

      if (Object.keys(clientErrors).length === 0) {
        const { fetchRegisterUser } = this.props;
        fetchRegisterUser({ username, email, password });
      }
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserLoggedIn, error } = this.props;
    return (
      <RegisterPage
        isUserLoggedIn={isUserLoggedIn}
        clientErrors={clientErrors}
        credentials={credentials}
        error={error}
        handleRegister={this.handleRegister}
        handleChange={this.handleChange}
        redirectToLogin={this.redirectToLogin}
      />
    );
  }
}

RegisterPageContainer.propTypes = {
  fetchRegisterUser: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string
};

const stateToProps = state => ({
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  fetchRegisterUser: credential => {
    dispatch(userAction.fetchRegisterUser(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPageContainer);
