import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";
import SubHeaderDivider from "./SubHeaderDivider.jsx";

const MessageGroupHeader = ({
  currentChannelMemberList,
  messageGroupMemberList,
  switchToMemberListView,
  switchToUserView,
  messageGroupName
}) => (
  <div className="main-header__title">
    <h1 className="main-header__title__name" onClick={switchToUserView}>
      {messageGroupName}
    </h1>
    <div className="main-header__title__sub-header">
      {currentChannelMemberList.length > 2 ? (
        <React.Fragment>
          <i
            className="far fa-user main-header__title__sub-header__icon"
            onClick={switchToMemberListView}
          />
          <span
            className="main-header__title__sub-header__number"
            onClick={switchToMemberListView}
          >
            {" "}
            {currentChannelMemberList.length}
          </span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <OnlineStatusBubble on={true} addClass="dark" />
        </React.Fragment>
      )}
      <SubHeaderDivider />
      {messageGroupMemberList.map(m => `${m.email} `)}
    </div>
  </div>
);

MessageGroupHeader.propTypes = {
  currentChannelMemberList: PropTypes.array.isRequired,
  messageGroupName: PropTypes.string,
  switchToUserView: PropTypes.func.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,
  switchToMemberListView: PropTypes.func.isRequired
};

export default MessageGroupHeader;
