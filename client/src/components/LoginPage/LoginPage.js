import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/selectors";
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
      resetForm,
      clearAllError,
      formFields,
      fetchLoginUser
    } = this.props;
    const clientErrors = fieldsValidation();

    // fetch login if there are no errors
    if (Object.keys(clientErrors).length === 0) {
      fetchLoginUser(formFields);
      resetForm();
      clearAllError();
    }
  };

  render() {
    const {
      isUserLoggedIn,
      error,
      handleChange,
      clientErrors,
      formFields
    } = this.props;
    return (
      <LoginPage
        clientErrors={clientErrors}
        formFields={formFields}
        isUserLoggedIn={isUserLoggedIn}
        error={error}
        handleChange={handleChange}
        handleLogin={this.handleLogin}
        redirectToRegister={this.redirectToRegister}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  history: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,

  fetchLoginUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
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
)(
  HOCForm({
    formFields: { username: "", password: "" },
    fieldsToValidate: ["username", "password"]
  })(LoginPageContainer)
);
