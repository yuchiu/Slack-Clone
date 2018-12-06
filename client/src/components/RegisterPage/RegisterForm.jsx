import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header } from "semantic-ui-react";

import { ErrorInline } from "@/components/common";

const RegisterForm = ({
  fieldErrors,
  formFields,

  handleRegister,
  handleFieldChange
}) => (
  <Form className="register-form">
    <Header as="h2">Register</Header>
    <Form.Field>
      <label>Username:</label>
      {fieldErrors.username && <ErrorInline text={fieldErrors.username} />}
      <Input
        id="username"
        type="username"
        name="username"
        value={formFields.username}
        className=""
        onChange={handleFieldChange}
        placeholder="username"
        size="large"
      />
    </Form.Field>
    <Form.Field>
      <label>Email:</label>
      {fieldErrors.email && <ErrorInline text={fieldErrors.email} />}
      <Input
        id="email"
        type="email"
        name="email"
        value={formFields.email}
        className=""
        onChange={handleFieldChange}
        placeholder="email"
        size="large"
      />
    </Form.Field>
    <Form.Field>
      <label>Password:</label>
      {fieldErrors.password && <ErrorInline text={fieldErrors.password} />}
      <Input
        id="password"
        type="password"
        name="password"
        value={formFields.password}
        className="validate"
        onChange={handleFieldChange}
        placeholder="password"
        size="large"
      />
    </Form.Field>
    <Form.Field>
      <label>Confirm Password:</label>
      {fieldErrors.confirmPassword && (
        <ErrorInline text={fieldErrors.confirmPassword} />
      )}
      <Input
        id="confirm_password"
        type="password"
        name="confirmPassword"
        value={formFields.confirmPassword}
        className="validate"
        onChange={handleFieldChange}
        placeholder="confirm password"
        size="large"
      />
    </Form.Field>
    <Button className="" primary size="large" onClick={handleRegister}>
      Register
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired
};

export default RegisterForm;
