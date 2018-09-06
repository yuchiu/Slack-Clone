import React from "react";
import { Form, Icon, Input, Radio, Button } from "antd";
import PropTypes from "prop-types";

import { InlineError } from "@/components/global";

const RegisterForm = ({
  handleRegister,
  onChange,
  redirectToLogin,
  clientErrors,
  credentials
}) => (
  <Form className="register-form">
    <Form.Item>
      <label htmlFor="username">Username</label>
      {clientErrors.username && <InlineError text={clientErrors.username} />}
      <Input
        prefix={<Icon type="user" />}
        id="username"
        type="username"
        name="username"
        value={credentials.username}
        className=""
        onChange={onChange}
        placeholder="username"
        size="large"
      />
    </Form.Item>
    <Form.Item>
      <label htmlFor="email">Email</label>
      {clientErrors.email && <InlineError text={clientErrors.email} />}
      <Input
        prefix={<Icon type="mail" />}
        id="email"
        type="email"
        name="email"
        value={credentials.email}
        className=""
        onChange={onChange}
        placeholder="email"
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
    <Form.Item>
      <label htmlFor="confirm_password">Confirm Password</label>
      {clientErrors.confirmPassword && (
        <InlineError text={clientErrors.confirmPassword} />
      )}
      <Input
        prefix={<Icon type="lock" />}
        id="confirm_password"
        type="password"
        name="confirmPassword"
        value={credentials.confirmPassword}
        className="validate"
        onChange={onChange}
        placeholder="confirm password"
        size="large"
      />
    </Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleRegister}
    >
      Register
    </Button>
    <br /> Already have an account? <a onClick={redirectToLogin}>Log In</a>
  </Form>
);

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default RegisterForm;
