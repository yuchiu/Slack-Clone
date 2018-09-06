import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

class AuthNavBar extends React.Component {
  render() {
    const { handleClick, selectedKeys, username, handleLogout } = this.props;
    return (
      <Menu onClick={handleClick} selectedKeys={selectedKeys} mode="horizontal">
        <Menu.Item key="landing">
          <Link to="/">
            <Icon type="home" />
            Slack
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          style={{ float: "right" }}
          title={
            <span>
              <Icon type="user" />
              {username}
            </span>
          }
        >
          <Menu.ItemGroup title="User's Setting">
            <Menu.Item key="my-profile">
              <Link to="/create-team">My Profile</Link>
            </Menu.Item>
            <Menu.Item key="edit-profile">
              <Link to="/create-team">Setting</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="______________">
            <Menu.Item key="logout">
              <p onClick={handleLogout}>Log Out</p>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item style={{ float: "right" }}>
          <Link to="/workspace">
            <Icon type="appstore" />
            WorkSpace
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
AuthNavBar.propTypes = {
  selectedKeys: PropTypes.array,
  handleClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default AuthNavBar;
