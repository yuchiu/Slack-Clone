import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "semantic-ui-react";

import { LogoSlack } from "@/components/common";

const AuthNavbar = ({ username, handleLogout, history }) => (
  <Menu size="large">
    <Menu.Item name="home" onClick={() => history.push("/")}>
      <LogoSlack size="32" />
      Slack
    </Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item name="workspace" onClick={() => history.push("/workspace")}>
        WorkSpace
      </Menu.Item>
      <Dropdown item text={username}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history.push("/create-team")}>
            Create Team
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

AuthNavbar.propTypes = {
  username: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default AuthNavbar;
