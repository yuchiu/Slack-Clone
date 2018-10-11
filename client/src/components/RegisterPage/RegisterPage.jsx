import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Form, Button, Input, Container, Header } from "semantic-ui-react";

import "./RegisterPage.scss";
import { Navbar, InlineError } from "@/components/common";

class RegisterPage extends React.Component {
  render() {
    const {
      isUserLoggedIn,
      error,
      clientErrors,
      credentials,

      handleRegister,
      handleChange,
      redirectToLogin
    } = this.props;
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/create-team" />}
        <Navbar />
        <main className="register-page">
          {" "}
          <Container text>
            <Form className="register-form">
              <Header as="h2">Register</Header>
              <Form.Field>
                <label htmlFor="username">Username</label>
                {clientErrors.username && (
                  <InlineError text={clientErrors.username} />
                )}
                <Input
                  id="username"
                  type="username"
                  name="username"
                  value={credentials.username}
                  className=""
                  onChange={handleChange}
                  placeholder="username"
                  size="large"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="email">Email</label>
                {clientErrors.email && (
                  <InlineError text={clientErrors.email} />
                )}
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  className=""
                  onChange={handleChange}
                  placeholder="email"
                  size="large"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Password</label>
                {clientErrors.password && (
                  <InlineError text={clientErrors.password} />
                )}
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  className="validate"
                  onChange={handleChange}
                  placeholder="password"
                  size="large"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="confirm_password">Confirm Password</label>
                {clientErrors.confirmPassword && (
                  <InlineError text={clientErrors.confirmPassword} />
                )}
                <Input
                  id="confirm_password"
                  type="password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  className="validate"
                  onChange={handleChange}
                  placeholder="confirm password"
                  size="large"
                />
              </Form.Field>
              <Button
                primary
                className=""
                size="large"
                onClick={handleRegister}
              >
                Register
              </Button>
              <br />
              <br /> Already have an account?{" "}
              <a className="redirect" onClick={redirectToLogin}>
                Log In
              </a>
            </Form>
          </Container>
          <div className="inline-error--center">
            {error && <InlineError text={`Error: ${error}`} />}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,

  handleRegister: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default RegisterPage;
