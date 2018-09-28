import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/common";

class SideBarHeader extends React.Component {
  state = {};

  render() {
    const { currentUser, currentTeam } = this.props;
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <div className="leftsidebar__header__top">
            <h1 className="leftsidebar__header__top__teamname">
              <Icon className="team-bell" name="bell outline" />
              {currentTeam.name}
            </h1>
          </div>
          <div className="leftsidebar__header__bottom">
            <div className="leftsidebar__header__bottom__left">
              <img
                className="leftsidebar__header__bottom__left__avatar"
                src={currentUser.avatarurl}
                alt="avatar"
              />
            </div>
            <div className="leftsidebar__header__bottom__right">
              <h1 className="leftsidebar__header__bottom__right__username">
                <OnlineStatusBubble on={true} /> {currentUser.username}
              </h1>
              Aloha World!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBarHeader;
