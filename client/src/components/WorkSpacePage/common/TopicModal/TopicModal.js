import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import { globalStateAction, channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector
} from "@/reducers/selectors";
import TopicModal from "./TopicModal.jsx";

class TopicModalContainer extends React.PureComponent {
  state = {
    clientError: {},
    text: ""
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

  toggleEditModal = () => {
    const { toggleEditModal } = this.props;
    toggleEditModal();
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
    this.toggleEditModal();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditChannel, currentChannel, currentTeam } = this.props;
    const clientError = validateForm.editTopic(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      fetchEditChannel({
        brief_description: text,
        teamId: currentTeam.id,
        channelId: currentChannel.id
      });
      this.setState({
        text: ""
      });
      this.toggleEditModal();
    }
  };

  render() {
    const { text, clientError } = this.state;
    const { topic, isEditModalOpen } = this.props;
    return (
      <TopicModal
        text={text}
        clientError={clientError}
        topic={topic}
        isEditModalOpen={isEditModalOpen}
        handleChange={this.handleChange}
        toggleEditModal={this.toggleEditModal}
        handleClose={this.handleClose}
        handleSave={this.handleSave}
      />
    );
  }
}

TopicModalContainer.propTypes = {
  topic: PropTypes.string,

  isEditModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  fetchEditChannel: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isEditModalOpen: globalStateSelector.getIsEditModalOpen(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  toggleEditModal: () => {
    dispatch(globalStateAction.toggleEditModal());
  },
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TopicModalContainer);
