import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import FormAddChannel from "./FormAddChannel";

class ModalAddChannel extends React.Component {
  handleSubmit = async () => {
    const {
      fetchCreateChannel,
      formFields,
      setFieldErrors,
      fieldsValidation,
      formOptions,
      currentTeam,
      resetForm,
      toggleModal,
      currentUser
    } = this.props;
    // validate user's login info on client side
    const errorList = fieldsValidation();
    const membersError = validateForm.addChannel(formOptions);
    const fieldErrors = {
      ...errorList,
      ...membersError
    };
    setFieldErrors(fieldErrors);

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchCreateChannel({
        teamId: currentTeam.id,
        currentUserId: currentUser.id,
        channelName: formFields.channelName,
        detail_description: formFields.purpose,
        isPublic: !formOptions.isChannelPrivate,
        membersList: formOptions.members
      });
      toggleModal();
      resetForm();
    }
  };

  toggleCheckboxValue = e => {
    const { updateFormOptions, formOptions } = this.props;
    updateFormOptions({
      isChannelPrivate: !formOptions.isChannelPrivate
    });
  };

  handleDropDownChange = (e, { value }) => {
    const { updateFormOptions } = this.props;
    updateFormOptions({
      members: value
    });
  };

  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,
      formOptions,
      currentTeamMemberList,
      currentUser,

      handleFieldChange,
      toggleModal
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <Modal size="large" open={isModalOpen} onClose={toggleModal}>
            <Modal.Header>
              {!formOptions.isChannelPrivate ? (
                <span>Create Public Channel</span>
              ) : (
                <span>Create Private Channel</span>
              )}
            </Modal.Header>
            <Modal.Content>
              <FormAddChannel
                formFields={formFields}
                fieldErrors={fieldErrors}
                formOptions={formOptions}
                currentTeamMemberList={currentTeamMemberList}
                currentUser={currentUser}
                handleFieldChange={handleFieldChange}
                toggleModal={toggleModal}
                handleSubmit={this.handleSubmit}
                handleDropDownChange={this.handleDropDownChange}
                toggleCheckboxValue={this.toggleCheckboxValue}
              />
            </Modal.Content>
          </Modal>
        ) : (
          <Icon
            className="plus-icon"
            onClick={toggleModal}
            name="plus circle"
          />
        )}
      </React.Fragment>
    );
  }
}

ModalAddChannel.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,

  resetForm: PropTypes.func.isRequired,
  setFieldErrors: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};

export default ModalAddChannel;
