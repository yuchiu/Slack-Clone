import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import { channelAction } from "@/actions";
import { HOCModal } from "@/components/common";
import { channelSelector, teamSelector } from "@/reducers/selectors";
import ModalTopic from "./ModalTopic.jsx";

class ModalTopicContainer extends React.PureComponent {
  state = {
    clientError: {},
    text: ""
  };

  clearState = () => {
    this.setState({
      clientError: {},
      text: ""
    });
  };

  handleClose = e => {
    const { toggleModal } = this.props;
    e.preventDefault();
    this.setState({
      text: ""
    });
    toggleModal();
    this.clearState();
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
    const { topic, isModalOpen, toggleModal } = this.props;
    return (
      <ModalTopic
        text={text}
        clientError={clientError}
        topic={topic}
        isModalOpen={isModalOpen}
        handleChange={this.handleChange}
        toggleModal={toggleModal}
        handleClose={this.handleClose}
        handleSave={this.handleSave}
      />
    );
  }
}

ModalTopicContainer.propTypes = {
  topic: PropTypes.string,

  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchEditChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(ModalTopicContainer));
