import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import SlackLogo from "../SlackLogo";

class UnauthNavBar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Menu size="large">
        <Menu.Item name="home" onClick={() => history.push("/")}>
          <SlackLogo size="32" />
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
  }
}

UnauthNavBar.propTypes = {};

export default UnauthNavBar;
