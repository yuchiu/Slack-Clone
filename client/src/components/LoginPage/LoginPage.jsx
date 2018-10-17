import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./LoginPage.scss";
import { Navbar, ErrorInline } from "@/components/common";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleLogin = () => {
    const {
      fieldsValidation,
      clearAllError,
      formFields,
      fetchLoginUser
    } = this.props;
    const clientErrors = fieldsValidation();

    // fetch login if there are no errors
    if (Object.keys(clientErrors).length === 0) {
      fetchLoginUser(formFields);
      clearAllError();
    }
  };

  render() {
    const {
      isUserLoggedIn,
      error,
      clientErrors,
      formFields,

      handleChange
    } = this.props;
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/workspace" />}
        <Navbar />
        <main className="login-page">
          <Container text>
            <LoginForm
              clientErrors={clientErrors}
              formFields={formFields}
              handleLogin={this.handleLogin}
              handleChange={handleChange}
            />
            <br />
            <br /> New to Slack?{" "}
            <a className="redirect" onClick={this.redirectToRegister}>
              Register
            </a>
          </Container>
          <br />
          <div className="inline-error--center">
            {error && <ErrorInline text={`Error: ${error}`} />}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  fetchLoginUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired
};

export default LoginPage;
