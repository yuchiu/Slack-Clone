import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import { LogoSlack } from "@/components/common";

const UnauthNavBar = ({ history }) => (
  <Menu size="large">
    <Menu.Item
      style={{ padding: "10px", fontSize: "1.2em" }}
      name="home"
      className="borderless"
      onClick={() => history.push("/")}
    >
      <LogoSlack size="32" />
      Slack
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item
        style={{ padding: "10px", fontSize: "1.2em" }}
        name="login"
        className="borderless"
        onClick={() => history.push("/login")}
      >
        Login
      </Menu.Item>
      <Menu.Item
        style={{ padding: "10px", fontSize: "1.2em" }}
        name="register"
        className="borderless"
        onClick={() => history.push("/register")}
      >
        Register
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

UnauthNavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default UnauthNavBar;
