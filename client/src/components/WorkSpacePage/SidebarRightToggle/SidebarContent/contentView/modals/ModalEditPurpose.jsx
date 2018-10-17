import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ButtonInline } from "@/components/common";
import EditPurposeForm from "./EditPurposeForm.jsx";

class ModalEditPurpose extends React.Component {
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
      handleChange,
      handleSave
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <EditPurposeForm
                fieldErrors={fieldErrors}
                formFields={formFields}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            </Modal.Content>
          </Modal>
        )}
        {!isModalOpen && currentPurpose ? (
          <ButtonInline
            title={currentPurpose}
            cssClass="lightgrey"
            displayText="edit"
            icon={<i className="fas fa-pencil-alt" />}
            handleClick={toggleModal}
          />
        ) : (
          <ButtonInline
            title={currentPurpose}
            cssClass="lightgrey"
            displayText="add channel purpose"
            icon={<i className="fas fa-pencil-alt" />}
            handleClick={toggleModal}
          />
        )}
      </React.Fragment>
    );
  }
}
ModalEditPurpose.propTypes = {
  currentPurpose: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchEditChannel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ModalEditPurpose;
