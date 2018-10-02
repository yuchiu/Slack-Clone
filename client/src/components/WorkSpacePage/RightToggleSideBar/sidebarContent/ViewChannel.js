import React from "react";
import PropTypes from "prop-types";

class ViewChannel extends React.Component {
  handleClick = () => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView("channel-members");
  };

  render() {
    const { currentChannel, currentChannelMembers } = this.props;
    return (
      <React.Fragment>
        <div className="view-header">
          <div className="view-header__name right-side-bar-item">
            {currentChannel.name}
          </div>
          <br />
          <div className="view-header__members  right-side-bar-item">
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
          <div className="view-detail__details-header  right-side-bar-item">
            Channel Details
          </div>
          <div className="view-detail__brief-description  right-side-bar-item">
            <span className="right-side-bar-label">Topic: </span>
            {`${currentChannel.brief_description}`}
          </div>
          <div className="view-detail__detail-description  right-side-bar-item">
            <span className="right-side-bar-label">Purpose: </span>
            {`${currentChannel.detail_description}`}
          </div>
          <div className="view-detail__created-at  right-side-bar-item">
            <span className="right-side-bar-label">Created At: </span>
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
  switchRightSideBarView: PropTypes.func.isRequired
};

export default ViewChannel;
