import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoadingOverlay from "react-loading-overlay";

import "./RegisterPage.scss";
import { Navbar, ErrorInline } from "@/components/common";
import RegisterForm from "./RegisterForm.jsx";

class RegisterPage extends React.Component {
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
      formFields
    } = this.props;

    if (formFields.password !== formFields.confirmPassword) {
      // display error if confirm password does not match password
      setClientErrors({
        confirmPassword: "confirm password have to match with password"
      });
    } else {
      const fieldErrors = fieldsValidation();

      // fetch login if there are no errors
      if (Object.keys(fieldErrors).length === 0) {
        fetchRegisterUser({
          username: formFields.username,
          email: formFields.email,
          password: formFields.password
        });
        clearAllError();
      }
    }
  };

  render() {
    const {
      isUserLoggedIn,
      error,
      fieldErrors,
      isLoading,
      formFields,

      handleChange
    } = this.props;
    return (
      <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
        <main className="register-page">
          {isUserLoggedIn && <Redirect to="/workspace" />}
          <Navbar />
          <Container text>
            <RegisterForm
              fieldErrors={fieldErrors}
              formFields={formFields}
              handleRegister={this.handleRegister}
              handleChange={handleChange}
            />
            <br />
            <br /> Already have an account?{" "}
            <a className="redirect" onClick={this.redirectToLogin}>
              Log In
            </a>
            <div className="inline-error--center">
              {error && <ErrorInline text={`Error: ${error}`} />}
            </div>
          </Container>
        </main>
      </LoadingOverlay>
    );
  }
}

RegisterPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  fetchRegisterUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired
};

export default RegisterPage;
