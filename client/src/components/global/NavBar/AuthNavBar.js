import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import SlackLogo from "../SlackLogo";

class AuthNavBar extends React.Component {
  render() {
    const { username, handleLogout, history } = this.props;
    return (
      <Menu size="large">
        <Menu.Item name="home" onClick={() => history.push("/")}>
          <SlackLogo size="32" />
          Slack
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="workspace"
            onClick={() => history.push("/workspace")}
          >
            WorkSpace
          </Menu.Item>
          <Dropdown item text={username}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => history.push("/create-team")}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => history.push("/create-team")}>
                Setting
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
AuthNavBar.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default AuthNavBar;
