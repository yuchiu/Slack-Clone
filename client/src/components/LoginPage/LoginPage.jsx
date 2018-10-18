import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";

import "./LoginPage.scss";
import { Navbar, ErrorInline } from "@/components/common";
import LoginForm from "./LoginForm";

const LoginPage = ({
  isUserLoggedIn,
  error,
  isLoading,
  fieldErrors,
  formFields,

  handleFieldChange,
  handleLogin,
  redirectToRegister
}) => (
  <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
    <main className="login-page">
      {isUserLoggedIn && <Redirect to="/workspace" />}
      <Navbar />{" "}
      <Container text>
        <LoginForm
          fieldErrors={fieldErrors}
          formFields={formFields}
          handleLogin={handleLogin}
          handleFieldChange={handleFieldChange}
        />
        <br />
        <br /> New to Slack?{" "}
        <a className="redirect" onClick={redirectToRegister}>
          Register
        </a>
      </Container>
      <br />
      <div className="inline-error--center">
        {error && <ErrorInline text={`Error: ${error}`} />}
      </div>
    </main>
  </LoadingOverlay>
);

LoginPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired
};

export default LoginPage;
