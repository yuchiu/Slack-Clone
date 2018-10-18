import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import { ButtonInline } from "@/components/common";
import FormEditFeeling from "./FormEditFeeling.jsx";

const ModalEditFeeling = ({
  formFields,
  isModalOpen,
  fieldErrors,
  currentFeeling,

  toggleModal,
  handleFieldChange,
  handleSave
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <FormEditFeeling
            formFields={formFields}
            handleFieldChange={handleFieldChange}
            handleSave={handleSave}
            fieldErrors={fieldErrors}
          />
        </Modal.Content>
      </Modal>
    )}
    {!isModalOpen && currentFeeling ? (
      <ButtonInline
        title={currentFeeling}
        cssClass="lightgrey"
        displayText="edit"
        icon={<i className="fas fa-pencil-alt" />}
        handleClick={toggleModal}
      />
    ) : (
      <ButtonInline
        cssClass="lightgrey"
        title={currentFeeling}
        displayText="add feeling"
        icon={<i className="fas fa-pencil-alt" />}
        handleClick={toggleModal}
      />
    )}
  </React.Fragment>
);

ModalEditFeeling.propTypes = {
  formFields: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentFeeling: PropTypes.string.isRequired,

  handleSave: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalEditFeeling;
