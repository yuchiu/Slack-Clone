import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/selectors/";
import { HOCForm } from "@/components/common";
import LoginPage from "./LoginPage.jsx";

class LoginPageContainer extends React.Component {
  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleLogin = () => {
    const {
      fieldsValidation,
      clearAllError,
      formFields,
      fetchSignInUser
    } = this.props;
    const fieldErrors = fieldsValidation();

    // fetch login if there are no errors
    if (Object.keys(fieldErrors).length === 0) {
      fetchSignInUser(formFields);
      clearAllError();
    }
  };

  handleSocialLogin = res => {
    const { fetchOAuthLogin, clearAllError } = this.props;
    console.log(res);
    const user = {
      provider: res.provider,
      username: res.profile.firstName + res.profile.lastName,
      email: res.profile.email,
      avatarurl: res.profile.profilePicURL,
      access_token: res.token.accessToken
    };
    fetchOAuthLogin(user);
    clearAllError();
  };

  handleSocialLoginFailure = err => {
    console.error(err);
    const { createError, error } = this.props;
    createError(error);
  };

  render() {
    const {
      isUserLoggedIn,
      error,
      isLoading,
      fieldErrors,
      formFields,

      handleFieldChange
    } = this.props;
    return (
      <LoginPage
        isUserLoggedIn={isUserLoggedIn}
        error={error}
        isLoading={isLoading}
        fieldErrors={fieldErrors}
        formFields={formFields}
        handleFieldChange={handleFieldChange}
        handleSocialLogin={this.handleSocialLogin}
        handleSocialLoginFailure={this.handleSocialLoginFailure}
        handleLogin={this.handleLogin}
        redirectToRegister={this.redirectToRegister}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  fetchSignInUser: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isLoading: authSelector.getAuthIsLoading(state),
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => dispatch(errorAction.clearAllError()),
  fetchSignInUser: credential => {
    dispatch(userAction.fetchSignInUser(credential));
  },
  fetchOAuthLogin: credential => {
    dispatch(userAction.fetchOAuthLogin(credential));
  },
  createError: text => {
    dispatch(errorAction.createError(text));
  }
});

const formDataToProps = () => ({
  formFields: { email: "", password: "" },
  fieldsToValidate: ["email", "password"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(LoginPageContainer));
