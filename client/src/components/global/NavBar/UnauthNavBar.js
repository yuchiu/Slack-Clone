import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import SlackLogo from "../SlackLogo";

class UnauthNavBar extends React.Component {
  render() {
    const { handleClick, current } = this.props;
    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="landing">
          <Link to="/">
            <SlackLogo size="32" />
            Slack
          </Link>
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <Link to="/register">
            <Icon type="user-add" />
            register
          </Link>
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <Link to="/login">
            <Icon type="login" />
            login
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

UnauthNavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectedKeys: PropTypes.array
};

export default UnauthNavBar;
