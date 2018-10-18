import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import { ButtonInline } from "@/components/common";
import FormEditPurpose from "./FormEditPurpose.jsx";

class ModalEditPurpose extends React.Component {
  render() {
    const {
      currentPurpose,
      isModalOpen,
      fieldErrors,
      formFields,

      toggleModal,
      handleFieldChange,
      handleSave
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <FormEditPurpose
                fieldErrors={fieldErrors}
                formFields={formFields}
                handleFieldChange={handleFieldChange}
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

  toggleModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalEditPurpose;
