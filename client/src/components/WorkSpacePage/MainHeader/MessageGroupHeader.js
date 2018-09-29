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
      messageGroupName
    } = this.props;
    return (
      <div className="main-header__title">
        <h1 className="main-header__title__name">{messageGroupName}</h1>
        <div className="main-header__title__sub-header">
          {currentChannelMembers.length > 2 ? (
            <React.Fragment>
              <i className="far fa-user main-header__title__sub-header__icon" />
              <span className="main-header__title__sub-header__number">
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

MessageGroupHeader.propTypes = {};

export default MessageGroupHeader;
