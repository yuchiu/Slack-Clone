import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { channelSelector, teamSelector } from "@/selectors/";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditTopic from "./ModalEditTopic.jsx";

class ModalEditTopicContainer extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      fetchEditChannel,
      currentChannel,
      currentTeam
    } = this.props;
    const fieldErrors = fieldsValidation();

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditChannel({
        brief_description: formFields.topic,
        teamId: currentTeam.id,
        channelId: currentChannel.id
      });
      toggleModal();
    }
  };

  render() {
    const {
      currentTopic,
      fieldErrors,
      formFields,
      isModalOpen,
      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <ModalEditTopic
        currentTopic={currentTopic}
        fieldErrors={fieldErrors}
        formFields={formFields}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSave={this.handleSave}
        handleFieldChange={handleFieldChange}
      />
    );
  }
}

ModalEditTopicContainer.propTypes = {
  currentTopic: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchEditChannel: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
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

const formDataToProps = () => ({
  formFields: { topic: "" },
  fieldsToValidate: ["topic"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditTopicContainer)));
