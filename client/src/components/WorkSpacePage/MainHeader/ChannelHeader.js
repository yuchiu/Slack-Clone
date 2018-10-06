import React from "react";
import PropTypes from "prop-types";

import {
  TopicModal,
  PublicOrPrivateTag
} from "@/components/WorkSpacePage/common";
import SubHeaderDivider from "./SubHeaderDivider";

class ChannelHeader extends React.Component {
  render() {
    const {
      currentChannelMemberList,
      currentChannel,
      switchToMemberListView
    } = this.props;
    return (
      <div className="main-header__title">
        <h1 className="main-header__title__name">
          {currentChannel.public ? (
            <PublicOrPrivateTag publicChannel={true} addClass="dark" />
          ) : (
            <PublicOrPrivateTag publicChannel={false} addClass="dark" />
          )}{" "}
          {currentChannel.name}
        </h1>
        <div className="main-header__title__sub-header">
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
            <SubHeaderDivider />
          </span>
          <TopicModal topic={currentChannel.brief_description} />
        </div>
      </div>
    );
  }
}

ChannelHeader.propTypes = {
  currentChannelMemberList: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  switchToMemberListView: PropTypes.func.isRequired
};

export default ChannelHeader;
