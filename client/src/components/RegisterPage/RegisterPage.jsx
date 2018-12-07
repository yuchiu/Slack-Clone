import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";

import "./RegisterPage.scss";
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from "@/utils/secrets";
import { Navbar, ErrorInline, SocialButton } from "@/components/common";
import RegisterForm from "./RegisterForm.jsx";

const RegisterPage = ({
  isUserLoggedIn,
  error,
  fieldErrors,
  isLoading,
  formFields,

  redirectToLogin,
  handleSocialLogin,
  handleSocialLoginFailure,
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
        Already have an account?{" "}
        <a className="redirect" onClick={redirectToLogin}>
          Log In
        </a>
        <br />
        <br />
        Or Log In With:
        <br />
        <div className="social-btn-group">
          <SocialButton
            provider="google"
            appId={GOOGLE_CLIENT_ID}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            <i className="fab fa-google-plus-g fa-2x" />
            Google
          </SocialButton>
        </div>
      </Container>
      <br />
      <div className="inline-error--center">
        {error && <ErrorInline text={`Error: ${error}`} />}
      </div>
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
