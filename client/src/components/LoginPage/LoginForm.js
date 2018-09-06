import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

import { InlineError } from "../global";

const LoginForm = ({
  handleLogin,
  onChange,
  redirectToRegister,
  clientErrors,
  credentials
}) => (
  <Form className="login-form">
    <Form.Item>
      <label htmlFor="username">Username</label>
      {clientErrors.username && <InlineError text={clientErrors.username} />}
      <Input
        prefix={<Icon type="mail" />}
        id="username"
        type="text"
        name="username"
        value={credentials.username}
        className=""
        onChange={onChange}
        placeholder="username"
        size="large"
      />
    </Form.Item>
    <Form.Item>
      <label htmlFor="password">Password</label>
      {clientErrors.password && <InlineError text={clientErrors.password} />}
      <Input
        prefix={<Icon type="lock" />}
        id="password"
        type="password"
        name="password"
        value={credentials.password}
        className="validate"
        onChange={onChange}
        placeholder="password"
        size="large"
      />
    </Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleLogin}
    >
      Log In
    </Button>
    <br /> New to Job Hunting? <a onClick={redirectToRegister}>Register</a>
  </Form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default LoginForm;
