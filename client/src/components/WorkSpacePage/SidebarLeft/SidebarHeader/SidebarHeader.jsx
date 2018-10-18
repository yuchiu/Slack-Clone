import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";

const SidebarHeader = ({
  currentUser,
  handleSwitchSidebarViewTeam,
  handleSwitchSidebarViewMyProfile,
  currentTeam
}) => (
  <div className="leftsidebar">
    <div className="leftsidebar__header">
      <div
        className="leftsidebar__header__top"
        onClick={handleSwitchSidebarViewTeam}
      >
        <h1 className="leftsidebar__header__top__teamname">
          {currentTeam.name}
        </h1>
      </div>
      <div
        className="leftsidebar__header__bottom"
        onClick={handleSwitchSidebarViewMyProfile}
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

SidebarHeader.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,

  handleSwitchSidebarViewTeam: PropTypes.func.isRequired,
  handleSwitchSidebarViewMyProfile: PropTypes.func.isRequired
};

export default SidebarHeader;
