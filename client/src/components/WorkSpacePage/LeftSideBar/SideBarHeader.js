import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

class SideBarHeader extends React.Component {
  state = {};

  render() {
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <h1 className="leftsidebar__header__teamname">
            <Icon className="team-bell" name="bell outline" />
            team name
          </h1>
          <h1 className="leftsidebar__header__username">username</h1>
        </div>
      </div>
    );
  }
}

export default SideBarHeader;
