import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction, globalStateAction } from "@/actions";
import { teamSelector, channelSelector } from "@/selectors/";
import ChannelSection from "./ChannelSection.jsx";

class ChannelSectionContainer extends React.Component {
  render() {
    const {
      currentTeam,
      channelList,

      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <ChannelSection
        currentTeam={currentTeam}
        switchChannel={switchChannel}
        switchRightSidebarView={switchRightSidebarView}
        channelList={channelList}
      />
    );
  }
}
ChannelSectionContainer.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  channelList: PropTypes.array.isRequired,

  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  channelList: channelSelector.getChannelList(state)
});

const dispatchToProps = dispatch => ({
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  },
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelSectionContainer);
