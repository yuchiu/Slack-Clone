import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction, globalStateAction } from "@/actions";
import { teamSelector, channelSelector } from "@/reducers/selectors";
import ChannelSection from "./ChannelSection.jsx";

class ChannelSectionContainer extends React.PureComponent {
  render() {
    const {
      toggleAddChannelModal,

      currentTeam,
      channelList,

      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <ChannelSection
        isAdmin={currentTeam.admin}
        toggleAddChannelModal={toggleAddChannelModal}
        switchChannel={switchChannel}
        switchRightSidebarView={switchRightSidebarView}
        teamId={currentTeam.id}
        channelList={channelList}
      />
    );
  }
}
ChannelSectionContainer.propTypes = {
  toggleAddChannelModal: PropTypes.func.isRequired,

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
