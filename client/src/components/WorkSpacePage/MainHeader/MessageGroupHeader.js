import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/common";
import SubHeaderDivider from "./SubHeaderDivider";

class MessageGroupHeader extends React.Component {
  componentDidMount() {}

  render() {
    const {
      currentChannelMembers,
      targetMemberList,
      handleSwitchRightSideBarView,
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
                onClick={handleSwitchRightSideBarView}
              />
              <span
                className="main-header__title__sub-header__number"
                onClick={handleSwitchRightSideBarView}
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
          {targetMemberList.map(m => `${m.email} `)}
        </div>
      </div>
    );
  }
}

MessageGroupHeader.propTypes = {
  currentChannelMembers: PropTypes.array.isRequired,
  messageGroupName: PropTypes.string,
  targetMemberList: PropTypes.array.isRequired,
  handleSwitchRightSideBarView: PropTypes.func.isRequired
};

export default MessageGroupHeader;
