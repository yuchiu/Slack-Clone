import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import ChannelList from "./ChannelList";
import MessageGroupHeader from "./MessageGroupHeader";
import MessageGroupList from "./MessageGroupList";
import SideBarHeader from "./SideBarHeader";
import InviteMemberSection from "./InviteMemberSection";
import { errorAction } from "@/actions";
import {
  AddChannelModal,
  AddMessageGroupModal,
  AddTeamMemberModal,
  ErrorModal
} from "./modals";

class LeftSideBar extends React.Component {
  state = {
    openAddChannelModal: false,
    openAddTeamMemberModal: false,
    openAddMessageGroupModal: false,
    openErrorModal: false
  };

  componentDidUpdate() {
    const { error } = this.props;
    const { openErrorModal } = this.state;
    console.log("error");
    console.log(error);
    if (error && !openErrorModal) {
      this.toggleErrorModal();
    }
  }

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleAddMessageGroupModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openAddMessageGroupModal: !this.state.openAddMessageGroupModal
    });
  };

  toggleAddTeamMemberModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openAddTeamMemberModal: !this.state.openAddTeamMemberModal
    });
  };

  toggleErrorModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openErrorModal: !this.state.openErrorModal
    });
  };

  render() {
    const {
      openAddTeamMemberModal,
      openAddChannelModal,
      openAddMessageGroupModal,
      openErrorModal
    } = this.state;
    const {
      currentUser,
      currentTeam,
      messageGroupList,
      channelList,
      error,
      clearError
    } = this.props;
    return (
      <React.Fragment>
        <section className="leftsidebar">
          <SideBarHeader currentUser={currentUser} currentTeam={currentTeam} />
          <ul className="leftsidebar__List">
            <ChannelHeader
              isAdmin={currentTeam.admin}
              toggleAddChannelModal={this.toggleAddChannelModal}
            />
            <ChannelList teamId={currentTeam.id} channelList={channelList} />
          </ul>
          <ul className="leftsidebar__List">
            <MessageGroupHeader
              toggleAddMessageGroupModal={this.toggleAddMessageGroupModal}
            />
            <MessageGroupList
              teamId={currentTeam.id}
              messageGroupList={messageGroupList}
            />
          </ul>
          <InviteMemberSection
            isAdmin={currentTeam.admin}
            toggleAddTeamMemberModal={this.toggleAddTeamMemberModal}
          />
        </section>
        <AddChannelModal
          teamId={currentTeam.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="add-channel-modal"
        />
        <AddMessageGroupModal
          teamId={currentTeam.id}
          onClose={this.toggleAddMessageGroupModal}
          open={openAddMessageGroupModal}
          key="add-message-group-modal"
        />
        <AddTeamMemberModal
          teamId={currentTeam.id}
          onClose={this.toggleAddTeamMemberModal}
          open={openAddTeamMemberModal}
          key="add-team-member-modal"
        />
        <ErrorModal
          onClose={this.toggleErrorModal}
          open={openErrorModal}
          error={error}
          clearError={clearError}
          key="error-modal"
        />
      </React.Fragment>
    );
  }
}
LeftSideBar.propTypes = {
  currentTeam: PropTypes.object.isRequired
};

/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  currentTeam: state.teamReducer.currentTeam,
  channelList: state.channelReducer.channelList,
  messageGroupList: state.channelReducer.messageGroupList,
  error: state.errorReducer.error
});

const dispatchToProps = dispatch => ({
  clearError: () => dispatch(errorAction.clearError())
});

export default connect(
  stateToProps,
  dispatchToProps
)(LeftSideBar);
