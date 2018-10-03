import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";
import SubHeaderDivider from "./SubHeaderDivider";

class MessageGroupHeader extends React.Component {
  componentDidMount() {}

  render() {
    const {
      currentChannelMembers,
      messageGroupMemberList,
      handleSwitchRightSidebarView,
      messageGroupName
    } = this.props;
    return (
      <div className="main-header__title">
        <h1 className="main-header__title__name">{messageGroupName}</h1>
        <div className="main-header__title__sub-header">
          {currentChannelMembers.length > 2 ? (
            <React.Fragment>
              <i
                className="far fa-user main-header__title__sub-header__icon"
                onClick={handleSwitchRightSidebarView}
              />
              <span
                className="main-header__title__sub-header__number"
                onClick={handleSwitchRightSidebarView}
              >
                {" "}
                {currentChannelMembers.length}
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <OnlineStatusBubble on={false} addClass="dark" />
            </React.Fragment>
          )}
          <SubHeaderDivider />
          {messageGroupMemberList.map(m => `${m.email} `)}
        </div>
      </div>
    );
  }
}

MessageGroupHeader.propTypes = {
  currentChannelMembers: PropTypes.array.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,
  handleSwitchRightSidebarView: PropTypes.func.isRequired
};

export default MessageGroupHeader;
