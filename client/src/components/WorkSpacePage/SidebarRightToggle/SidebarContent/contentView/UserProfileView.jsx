import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";

class UserProfileView extends React.Component {
  handleClick = () => {
    const {
      switchChannel,
      currentUser,
      targetUser,
      messageGroupList,
      currentTeam,
      fetchCreateChannel
    } = this.props;

    let isDirectMessageFound = false;

    /* check if direct message between target user and current user exist */
    messageGroupList.map(messageGroup => {
      /* if direct message is found, switch to that channel */
      if (messageGroup.name === targetUser.username) {
        switchChannel(messageGroup.id);
        isDirectMessageFound = true;
      }
      return messageGroup;
    });
    /* direct message not found, start direct message with target user */
    if (!isDirectMessageFound) {
      // convert target user into array to match API's membersList variable
      const targetUserArr = [];
      targetUserArr.push(targetUser.id);

      fetchCreateChannel({
        teamId: currentTeam.id,
        messageGroup: true,
        currentUserId: currentUser.id,
        isPublic: false,
        channelName: `${currentUser.username}, ${targetUser.username}`,
        membersList: targetUserArr
      });
    }
  };

  render() {
    const { targetUser } = this.props;
    return (
      <React.Fragment>
        {targetUser && (
          <React.Fragment>
            <div className="view-pic">
              <img
                alt="profile-pig"
                className="view-pic__img"
                src={targetUser.avatarurl}
              />
            </div>
            <div className="view-header">
              <span className="view-header__name  right-sidebar-item">
                {targetUser.username}
                <OnlineStatusBubble on={true} />
              </span>
              <br />
              <br />
              <div className="view-header__brief-description  right-sidebar-item">
                <span className="right-sidebar-label">feeling: </span>
                {`${targetUser.brief_description}`}
              </div>
              <br />
              <button
                className="right-sidebar-button right-sidebar-item"
                onClick={this.handleClick}
              >
                Direct Message
              </button>
            </div>

            <div className="view-detail">
              <div className="view-detail__email  right-sidebar-item">
                <span className="right-sidebar-label ">Email: </span>
                {`${targetUser.email}`}
              </div>
              <br />
              <div className="view-header__detail-description  right-sidebar-item">
                <span className="right-sidebar-label">
                  About {targetUser.username}:{" "}
                </span>
                {`${targetUser.detail_description}`}
              </div>
              <br />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

UserProfileView.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  targetUser: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchChannel: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};

export default UserProfileView;
