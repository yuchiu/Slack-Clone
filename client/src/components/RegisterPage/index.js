import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { validateForm, sessionStore } from "@/utils";
import { userAction } from "@/actions";
import { NavBar, InlineError } from "@/components/global";
import RegisterForm from "./RegisterForm";

class RegisterPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    });
  }

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
        const { registerUser } = this.props;
        registerUser({ username, email, password });
      }
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { error } = this.props;
    const isUserLoggedIn = sessionStore.getLoginStatus();
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/" />}
        <NavBar />
        <main className="register-page">
          <RegisterForm
            handleRegister={this.handleRegister}
            onChange={this.handleChange}
            redirectToLogin={this.redirectToLogin}
            clientErrors={clientErrors}
            credentials={credentials}
          />
          {error && <InlineError text={error} />}
        </main>
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string
};

const stateToProps = state => ({
  error: state.userReducer.error
});

const dispatchToProps = dispatch => ({
  registerUser: credential => {
    dispatch(userAction.registerUser(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPage);
