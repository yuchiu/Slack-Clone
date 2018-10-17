import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header } from "semantic-ui-react";

import { ErrorInline } from "@/components/common";

const LoginForm = ({
  fieldErrors,
  formFields,

  handleLogin,
  handleChange
}) => (
  <Form className="login-form">
    <Header as="h2">Log In</Header>
    <Form.Field>
      <label htmlFor="username">Username:</label>
      {fieldErrors.username && <ErrorInline text={fieldErrors.username} />}
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
      <label htmlFor="password">Password:</label>
      {fieldErrors.password && <ErrorInline text={fieldErrors.password} />}
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
  </Form>
);

LoginForm.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default LoginForm;
