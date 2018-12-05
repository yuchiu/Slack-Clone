import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";

import "./RegisterPage.scss";
import { Navbar, ErrorInline, OAuthSection } from "@/components/common";
import RegisterForm from "./RegisterForm.jsx";

const RegisterPage = ({
  isUserLoggedIn,
  error,
  fieldErrors,
  isLoading,
  formFields,

  redirectToLogin,
  handleRegister,
  handleFieldChange
}) => (
  <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
    <main className="register-page">
      {isUserLoggedIn && <Redirect to="/workspace" />}
      <Navbar />
      <Container text>
        <RegisterForm
          fieldErrors={fieldErrors}
          formFields={formFields}
          handleRegister={handleRegister}
          handleFieldChange={handleFieldChange}
        />
        <OAuthSection />
        <br />
        <br /> Already have an account?{" "}
        <a className="redirect" onClick={redirectToLogin}>
          Log In
        </a>
        <div className="inline-error--center">
          {error && <ErrorInline text={`Error: ${error}`} />}
        </div>
      </Container>
    </main>
  </LoadingOverlay>
);

RegisterPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  redirectToLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default RegisterPage;
