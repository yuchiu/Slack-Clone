import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header } from "semantic-ui-react";

import { ErrorInline } from "@/components/common";

const LoginForm = ({
  fieldErrors,
  formFields,

  handleLogin,
  handleFieldChange
}) => (
  <Form className="login-form">
    <Header as="h2">Log In</Header>
    <Form.Field>
      <label>Email:</label>
      {fieldErrors.email && <ErrorInline text={fieldErrors.email} />}
      <Input
        id="email"
        type="text"
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
    <Button className="" primary size="large" onClick={handleLogin}>
      Log In
    </Button>
  </Form>
);

LoginForm.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleLogin: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default LoginForm;
