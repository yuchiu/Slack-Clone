import React from "react";
import PropTypes from "prop-types";

import "./SidebarContent.scss";
import {
  MyProfileView,
  ChannelDetailView,
  MemberListView,
  TeamDetailView,
  UserProfileView
} from "./contentView";

const SidebarContent = ({ rightSidebarView }) => (
  <div className="right-sidebar-content">
    {rightSidebarView === "my-profile" && <MyProfileView />}

    {rightSidebarView === "user-profile" && <UserProfileView />}

    {rightSidebarView === "channel" && <ChannelDetailView />}

    {rightSidebarView === "team" && <TeamDetailView />}

    {(rightSidebarView === "message-group-members" ||
      rightSidebarView === "channel-members" ||
      rightSidebarView === "team-members") && <MemberListView />}
  </div>
);

SidebarContent.propTypes = {
  rightSidebarView: PropTypes.string.isRequired
};

export default SidebarContent;
