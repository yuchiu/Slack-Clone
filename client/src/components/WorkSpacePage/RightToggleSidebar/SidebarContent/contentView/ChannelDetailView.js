import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { channelSelector } from "@/reducers/selectors";
import ChannelDetailView from "./ChannelDetailView.jsx";

const stateToProps = state => ({
  currentChannel: channelSelector.getCurrentChannel(state),
  currentChannelMemberList: channelSelector.getCurrentChannelMemberList(state)
});

const dispatchToProps = dispatch => ({
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelDetailView);
