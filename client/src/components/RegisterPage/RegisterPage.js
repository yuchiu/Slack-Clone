import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/selectors";
import { HOCForm } from "@/components/common";
import RegisterPage from "./RegisterPage.jsx";

class RegisterPageContainer extends React.Component {
  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleRegister = () => {
    const {
      fetchRegisterUser,
      clearAllError,
      setClientErrors,
      fieldsValidation,
      formFields: { username, email, password, confirmPassword }
    } = this.props;

    console.log(this.props.clientErrors);

    if (password !== confirmPassword) {
      console.log("password !=== confirm");
      setClientErrors({
        confirmPassword: "confirm password have to match with password"
      });
    } else {
      const clientErrors = fieldsValidation();
      if (Object.keys(clientErrors).length === 0) {
        fetchRegisterUser({ username, email, password });
        clearAllError();
      }
    }
  };

  render() {
    const {
      clientErrors,
      formFields,
      isUserLoggedIn,
      error,
      handleChange
    } = this.props;
    return (
      <RegisterPage
        isUserLoggedIn={isUserLoggedIn}
        clientErrors={clientErrors}
        formFields={formFields}
        error={error}
        handleChange={handleChange}
        handleRegister={this.handleRegister}
        redirectToLogin={this.redirectToLogin}
      />
    );
  }
}

RegisterPageContainer.propTypes = {
  history: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,

  fetchRegisterUser: PropTypes.func.isRequired,
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
  fetchRegisterUser: credential => {
    dispatch(userAction.fetchRegisterUser(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(
  HOCForm({
    formFields: { username: "", email: "", password: "", confirmPassword: "" },
    fieldsToValidate: ["username", "email", "password"]
  })(RegisterPageContainer)
);
