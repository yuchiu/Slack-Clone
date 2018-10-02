import React from "react";
import PropTypes from "prop-types";

class ViewChannel extends React.Component {
  handleClick = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("channel-members");
  };

  render() {
    const { currentChannel, currentChannelMembers } = this.props;
    return (
      <React.Fragment>
        <div className="view-header">
          <div className="view-header__name right-sidebar-item">
            {currentChannel.name}
          </div>
          <br />
          <div className="view-header__members  right-sidebar-item">
            <i
              className="far fa-user view-header__members__icon"
              onClick={this.handleClick}
            />
            <span
              className="view-header__members__text"
              onClick={this.handleClick}
            >
              {" "}
              {currentChannelMembers.length} Members
            </span>
          </div>
        </div>
        <div className="view-detail ">
          <div className="view-detail__details-header  right-sidebar-item">
            Channel Details
          </div>
          <div className="view-detail__brief-description  right-sidebar-item">
            <span className="right-sidebar-label">Topic: </span>
            {`${currentChannel.brief_description}`}
          </div>
          <div className="view-detail__detail-description  right-sidebar-item">
            <span className="right-sidebar-label">Purpose: </span>
            {`${currentChannel.detail_description}`}
          </div>
          <div className="view-detail__created-at  right-sidebar-item">
            <span className="right-sidebar-label">Created At: </span>
            {`${currentChannel.created_at}`}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewChannel.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  currentChannelMembers: PropTypes.array.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default ViewChannel;
