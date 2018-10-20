import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction, channelAction } from "@/actions";
import {
  channelSelector,
  globalStateSelector,
  teamSelector,
  userSelector
} from "@/selectors/";
import MemberListView from "./MemberListView.jsx";

const stateToProps = state => ({
  rightSidebarView: globalStateSelector.getRightSidebarView(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state),
  currentChannelMemberList: channelSelector.getCurrentChannelMemberList(state),
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  },
  switchTargetUser: targetUserId => {
    dispatch(globalStateAction.switchTargetUser(targetUserId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MemberListView);
