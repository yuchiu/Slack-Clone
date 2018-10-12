import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import { teamSelector, channelSelector } from "@/reducers/selectors";
import { channelAction } from "@/actions";
import EditChannelPurposeModal from "./EditChannelPurposeModal.jsx";

class EditChannelPurposeModalContainer extends React.PureComponent {
  state = {
    text: "",
    clientError: {},
    isModalOpen: false
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

  toggleModalOpen = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: "",
      isModalOpen: false
    });
    this.toggleModalOpen();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditChannel, currentTeam, currentChannel } = this.props;
    const clientError = validateForm.editPurpose(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      fetchEditChannel({
        detail_description: text,
        channelId: currentChannel.id,
        teamId: currentTeam.id
      });
      this.setState({
        isModalOpen: false,
        text: ""
      });
    }
  };

  render() {
    const { text, isModalOpen, clientError } = this.state;
    const { purpose } = this.props;
    return (
      <EditChannelPurposeModal
        purpose={purpose}
        text={text}
        isModalOpen={isModalOpen}
        clientError={clientError}
        toggleModalOpen={this.toggleModalOpen}
        handleClose={this.handleClose}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
      />
    );
  }
}

EditChannelPurposeModalContainer.propTypes = {
  purpose: PropTypes.string,

  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

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
)(EditChannelPurposeModalContainer);
