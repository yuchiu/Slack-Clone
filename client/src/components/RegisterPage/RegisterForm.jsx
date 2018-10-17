import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header } from "semantic-ui-react";

import { ErrorInline } from "@/components/common";

const RegisterForm = ({
  clientErrors,
  formFields,

  handleRegister,
  handleChange
}) => (
  <Form className="register-form">
    <Header as="h2">Register</Header>
    <Form.Field>
      <label htmlFor="username">Username:</label>
      {clientErrors.username && <ErrorInline text={clientErrors.username} />}
      <Input
        id="username"
        type="username"
        name="username"
        value={formFields.username}
        className=""
        onChange={handleChange}
        placeholder="username"
        size="large"
      />
    </Form.Field>
    <Form.Field>
      <label htmlFor="email">Email:</label>
      {clientErrors.email && <ErrorInline text={clientErrors.email} />}
      <Input
        id="email"
        type="email"
        name="email"
        value={formFields.email}
        className=""
        onChange={handleChange}
        placeholder="email"
        size="large"
      />
    </Form.Field>
    <Form.Field>
      <label htmlFor="password">Password:</label>
      {clientErrors.password && <ErrorInline text={clientErrors.password} />}
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
    <Form.Field>
      <label htmlFor="confirm_password">Confirm Password:</label>
      {clientErrors.confirmPassword && (
        <ErrorInline text={clientErrors.confirmPassword} />
      )}
      <Input
        id="confirm_password"
        type="password"
        name="confirmPassword"
        value={formFields.confirmPassword}
        className="validate"
        onChange={handleChange}
        placeholder="confirm password"
        size="large"
      />
    </Form.Field>
    <Button primary className="" size="large" onClick={handleRegister}>
      Register
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired
};

export default RegisterForm;
