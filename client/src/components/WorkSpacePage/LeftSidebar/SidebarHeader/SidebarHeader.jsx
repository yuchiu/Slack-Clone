import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";

class SidebarHeader extends React.Component {
  handleSwitchRightSidebarView = selectedView => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView(selectedView);
  };

  render() {
    const { currentUser, currentTeam } = this.props;
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <div
            className="leftsidebar__header__top"
            onClick={this.handleSwitchRightSidebarView.bind(this, "team")}
          >
            <h1 className="leftsidebar__header__top__teamname">
              {currentTeam.name}
            </h1>
          </div>
          <div
            className="leftsidebar__header__bottom"
            onClick={this.handleSwitchRightSidebarView.bind(this, "my-profile")}
          >
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
              {currentUser.brief_description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SidebarHeader.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default SidebarHeader;
