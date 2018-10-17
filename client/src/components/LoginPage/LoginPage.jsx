import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Form, Button, Input, Container, Header } from "semantic-ui-react";

import "./LoginPage.scss";
import { Navbar, ErrorInline } from "@/components/common";

const LoginPage = ({
  isUserLoggedIn,
  error,
  clientErrors,
  formFields,

  handleLogin,
  handleChange,
  redirectToRegister
}) => (
  <React.Fragment>
    {isUserLoggedIn && <Redirect to="/workspace" />}
    <Navbar />
    <main className="login-page">
      <Container text>
        <Form className="login-form">
          <Header as="h2">Log In</Header>
          <Form.Field>
            <label htmlFor="username">Username</label>
            {clientErrors.username && (
              <ErrorInline text={clientErrors.username} />
            )}
            <Input
              id="username"
              type="text"
              name="username"
              value={formFields.username}
              className=""
              onChange={handleChange}
              placeholder="username"
              size="large"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            {clientErrors.password && (
              <ErrorInline text={clientErrors.password} />
            )}
            <Input
              id="password"
              type="password"
              name="password"
              value={formFields.password}
              className="validate"
              onChange={handleChange}
              placeholder="password"
              size="large"
            />
          </Form.Field>
          <Button primary className="" size="large" onClick={handleLogin}>
            Log In
          </Button>
          <br />
          <br /> New to Slack?{" "}
          <a className="redirect" onClick={redirectToRegister}>
            Register
          </a>
        </Form>
      </Container>
      <br />
      <div className="inline-error--center">
        {error && <ErrorInline text={`Error: ${error}`} />}
      </div>
    </main>
  </React.Fragment>
);

LoginPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,

  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default LoginPage;
