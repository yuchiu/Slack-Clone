import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

class SideBarHeader extends React.Component {
  state = {};

  render() {
    const { user, currentTeam } = this.props;
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <h1 className="leftsidebar__header__teamname">
            <Icon className="team-bell" name="bell outline" />
            {currentTeam.name}
          </h1>
          <h1 className="leftsidebar__header__username">{user.username}</h1>
        </div>
      </div>
    );
  }
}

export default SideBarHeader;
