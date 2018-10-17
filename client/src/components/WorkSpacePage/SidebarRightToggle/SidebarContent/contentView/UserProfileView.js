import { connect } from "react-redux";

import { channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector,
  userSelector
} from "@/reducers/";
import UserProfileView from "./UserProfileView.jsx";

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
)(UserProfileView);
