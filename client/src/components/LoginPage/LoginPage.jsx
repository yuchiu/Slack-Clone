import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import GitHubLogin from "react-github-login";

import { oauthService } from "@/actions/services/";
import "./LoginPage.scss";
import {
  GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID,
  FACEBOOK_CLIENT_ID
} from "@/utils/secrets";
import { Navbar, OAuthSection, ErrorInline } from "@/components/common";
import LoginForm from "./LoginForm";

import SocialButton from "./SocialButton";

const handleSocialLogin = user => {
  console.log(user);
};

const handleSocialLoginFailure = err => {
  console.error(err);
};

const handleSocialLogout = res => {
  console.log(res);
};

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
        <br />
        <SocialButton
          provider="facebook"
          appId={FACEBOOK_CLIENT_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          onLogoutSuccess={handleSocialLogout}
        >
          Login with Facebook
        </SocialButton>
        <SocialButton
          provider="google"
          appId={GOOGLE_CLIENT_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          onLogoutSuccess={handleSocialLogout}
        >
          Login with Google
        </SocialButton>
        <SocialButton
          autoCleanUri
          provider="instagram"
          appId="afdf675d26214280ac9a792afea5651c"
          redirect={process.env.INSTAGRAM_REDIRECT}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          onLogoutSuccess={handleSocialLogout}
          key={"instagram"}
        >
          Login with Instagram
        </SocialButton>
        <SocialButton
          provider="linkedin"
          appId="7775kne2guetd0"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          onLogoutSuccess={handleSocialLogout}
          key={"linkedin"}
        >
          Login with LinkedIn
        </SocialButton>
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
