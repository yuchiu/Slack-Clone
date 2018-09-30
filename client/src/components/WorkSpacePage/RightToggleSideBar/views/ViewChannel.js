import React from "react";

class ViewChannel extends React.Component {
  render() {
    const {
      currentChannel,
      currentChannelMembers,
      switchViewToMemberList
    } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="view-detail">
            <div className="view-detail__name">{currentChannel.name}</div>

            <div
              className="view-detail__members"
              onClick={switchViewToMemberList}
            >
              <i className="far fa-user" />
              <span className=""> {currentChannelMembers.length}</span>
            </div>
            <div className="view-detail__brief-description">
              {`Topic: ${currentChannel.brief_description}`}
            </div>
            <div className="view-detail__detail-description">
              {`Purpose: ${currentChannel.detail_description}`}
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

ViewChannel.propTypes = {};

export default ViewChannel;
