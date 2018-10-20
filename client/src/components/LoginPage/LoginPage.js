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
      fetchLoginUser
    } = this.props;
    const fieldErrors = fieldsValidation();

    // fetch login if there are no errors
    if (Object.keys(fieldErrors).length === 0) {
      fetchLoginUser(formFields);
      clearAllError();
    }
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

  fetchLoginUser: PropTypes.func.isRequired,
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
  fetchLoginUser: credential => {
    dispatch(userAction.fetchLoginUser(credential));
  }
});

const formDataToProps = () => ({
  formFields: { username: "", password: "" },
  fieldsToValidate: ["username", "password"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(LoginPageContainer));
