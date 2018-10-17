import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

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
      const clientErrors = fieldsValidation();

      // fetch login if there are no errors
      if (Object.keys(clientErrors).length === 0) {
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
      clientErrors,
      formFields,

      handleChange
    } = this.props;
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/workspace" />}
        <Navbar />
        <main className="register-page">
          <Container text>
            <RegisterForm
              clientErrors={clientErrors}
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
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  fetchRegisterUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired
};

export default RegisterPage;
