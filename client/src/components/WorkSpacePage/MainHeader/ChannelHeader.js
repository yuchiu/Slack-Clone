import React from "react";
import PropTypes from "prop-types";

import SubHeaderDivider from "./SubHeaderDivider";

class ChannelHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { currentChannelMembers, currentChannel } = this.props;
    return (
      <div className="main-header__title">
        <h1 className="main-header__title__name">#{currentChannel.name}</h1>
        <div className="main-header__title__sub-header">
          {currentChannel.public && <span> public </span>}
          {!currentChannel.public && <span> private </span>}
          <SubHeaderDivider />
          <i className="far fa-user main-header__title__sub-header__icon" />{" "}
          <span className="main-header__title__sub-header__number">
            {currentChannelMembers.length}
            <SubHeaderDivider />
          </span>
          <span className="">{currentChannel.brief_description}</span>
        </div>
      </div>
    );
  }
}

ChannelHeader.propTypes = {};

export default ChannelHeader;
