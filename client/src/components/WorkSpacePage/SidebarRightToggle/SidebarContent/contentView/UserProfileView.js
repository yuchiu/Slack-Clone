import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector,
  userSelector
} from "@/selectors/";
import UserProfileView from "./UserProfileView.jsx";

class UserProfileViewContainer extends React.Component {
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
      <UserProfileView targetUser={targetUser} handleClick={this.handleClick} />
    );
  }
}

UserProfileViewContainer.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  targetUser: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchChannel: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};
const stateToProps = state => ({
  targetUser: globalStateSelector.getTargetUser(state),
  messageGroupList: channelSelector.getMessageGroupList(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  },
  fetchCreateChannel: channelFormInfo => {
    dispatch(channelAction.fetchCreateChannel(channelFormInfo));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(UserProfileViewContainer);
