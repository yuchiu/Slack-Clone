import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { channelSelector } from "@/selectors/";
import ChannelDetailView from "./ChannelDetailView.jsx";

class ChannelDetailViewContainer extends React.Component {
  handleClick = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("channel-members");
  };

  render() {
    const { currentChannel, currentChannelMemberList } = this.props;
    return (
      <ChannelDetailView
        currentChannel={currentChannel}
        currentChannelMemberList={currentChannelMemberList}
        handleClick={this.handleClick}
      />
    );
  }
}

ChannelDetailViewContainer.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  currentChannelMemberList: PropTypes.array.isRequired,

  switchRightSidebarView: PropTypes.func.isRequired
};

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
)(ChannelDetailViewContainer);
