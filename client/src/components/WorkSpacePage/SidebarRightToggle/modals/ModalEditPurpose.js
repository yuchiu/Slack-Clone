import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamSelector, channelSelector } from "@/selectors/";
import { channelAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditPurpose from "./ModalEditPurpose.jsx";

class ModalEditPurposeContainer extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      fetchEditChannel,
      currentTeam,
      currentChannel
    } = this.props;
    const fieldErrors = fieldsValidation();

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditChannel({
        detail_description: formFields.purpose,
        channelId: currentChannel.id,
        teamId: currentTeam.id
      });
      toggleModal();
    }
  };

  render() {
    const {
      currentPurpose,
      isModalOpen,
      fieldErrors,
      formFields,

      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <ModalEditPurpose
        currentPurpose={currentPurpose}
        isModalOpen={isModalOpen}
        fieldErrors={fieldErrors}
        formFields={formFields}
        toggleModal={toggleModal}
        handleFieldChange={handleFieldChange}
        handleSave={this.handleSave}
      />
    );
  }
}
ModalEditPurposeContainer.propTypes = {
  currentPurpose: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
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
  formFields: { purpose: "" },
  fieldsToValidate: ["purpose"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditPurposeContainer)));
