import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import FormAddTeamMember from "./FormAddTeamMember.jsx";

class ModalAddTeamMember extends React.Component {
  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,

      toggleModal,
      handleSubmit,
      handleFieldChange
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <React.Fragment>
            <Modal size="small" open={isModalOpen} onClose={toggleModal}>
              <Modal.Header>Invite Team Member</Modal.Header>
              <Modal.Content>
                <FormAddTeamMember
                  formFields={formFields}
                  fieldErrors={fieldErrors}
                  handleFieldChange={handleFieldChange}
                  toggleModal={toggleModal}
                  handleSubmit={handleSubmit}
                />
              </Modal.Content>
            </Modal>
            <div className="invite-people-button" onClick={toggleModal}>
              <span className="invite-people-button__plus">+</span> Invite
              People
            </div>
          </React.Fragment>
        ) : (
          <div className="invite-people-button" onClick={toggleModal}>
            <span className="invite-people-button__plus">+</span> Invite People
          </div>
        )}
      </React.Fragment>
    );
  }
}

ModalAddTeamMember.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ModalAddTeamMember;
