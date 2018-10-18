import React from "react";
import PropTypes from "prop-types";
import { Modal, Icon } from "semantic-ui-react";

import FormAddChannel from "./FormAddChannel";

class ModalAddChannel extends React.Component {
  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,
      formOptions,
      currentTeamMemberList,
      currentUser,

      handleFieldChange,
      toggleModal,
      handleDropDownChange,
      toggleCheckboxValue,
      handleSubmit
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
                handleSubmit={handleSubmit}
                handleDropDownChange={handleDropDownChange}
                toggleCheckboxValue={toggleCheckboxValue}
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
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,

  handleDropDownChange: PropTypes.func.isRequired,
  toggleCheckboxValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ModalAddChannel;
