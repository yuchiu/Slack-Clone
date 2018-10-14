import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import { LogoSlack } from "@/components/common";

const UnauthNavBar = ({ history }) => (
  <Menu size="large">
    <Menu.Item name="home" onClick={() => history.push("/")}>
      <LogoSlack size="32" />
      Slack
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item name="login" onClick={() => history.push("/login")}>
        login
      </Menu.Item>
      <Menu.Item name="register" onClick={() => history.push("/register")}>
        register
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

UnauthNavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default UnauthNavBar;
