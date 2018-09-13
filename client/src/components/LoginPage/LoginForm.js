import React from "react";
import { Form, Button, Input, Container, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineError } from "../global";

const LoginForm = ({
  handleLogin,
  onChange,
  redirectToRegister,
  clientErrors,
  credentials
}) => (
  <Container text>
    <Form className="login-form">
      <Header as="h2">Log In</Header>
      <Form.Field>
        <label htmlFor="username">Username</label>
        {clientErrors.username && <InlineError text={clientErrors.username} />}
        <Input
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          className=""
          onChange={onChange}
          placeholder="username"
          size="large"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        {clientErrors.password && <InlineError text={clientErrors.password} />}
        <Input
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          className="validate"
          onChange={onChange}
          placeholder="password"
          size="large"
        />
      </Form.Field>
      <Button type="primary" className="" size="large" onClick={handleLogin}>
        Log In
      </Button>
      <br /> New to Slack? <a onClick={redirectToRegister}>Register</a>
    </Form>
  </Container>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default LoginForm;
