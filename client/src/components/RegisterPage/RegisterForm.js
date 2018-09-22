import React from "react";
import { Form, Button, Input, Container, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineError } from "@/components/common";

const RegisterForm = ({
  handleRegister,
  onChange,
  redirectToLogin,
  clientErrors,
  credentials
}) => (
  <Container text>
    <Form className="register-form">
      <Header as="h2">Register</Header>
      <Form.Field>
        <label htmlFor="username">Username</label>
        {clientErrors.username && <InlineError text={clientErrors.username} />}
        <Input
          id="username"
          type="username"
          name="username"
          value={credentials.username}
          className=""
          onChange={onChange}
          placeholder="username"
          size="large"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="email">Email</label>
        {clientErrors.email && <InlineError text={clientErrors.email} />}
        <Input
          id="email"
          type="email"
          name="email"
          value={credentials.email}
          className=""
          onChange={onChange}
          placeholder="email"
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
          onChange={onChange}
          placeholder="confirm password"
          size="large"
        />
      </Form.Field>
      <Button type="primary" className="" size="large" onClick={handleRegister}>
        Register
      </Button>
      <br />
      <br /> Already have an account?{" "}
      <a className="redirect" onClick={redirectToLogin}>
        Log In
      </a>
    </Form>
  </Container>
);

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default RegisterForm;
