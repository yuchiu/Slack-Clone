import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import { ButtonInline } from "@/components/common";
import FormEditAbout from "./FormEditAbout.jsx";

const ModalEditFeeling = ({
  formFields,
  isModalOpen,
  fieldErrors,
  currentAbout,

  toggleModal,
  handleSave,
  handleFieldChange
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <FormEditAbout
            formFields={formFields}
            handleFieldChange={handleFieldChange}
            handleSave={handleSave}
            fieldErrors={fieldErrors}
          />
        </Modal.Content>
      </Modal>
    )}
    {!isModalOpen && currentAbout ? (
      <ButtonInline
        title={currentAbout}
        cssClass="lightgrey"
        displayText="edit"
        icon={<i className="fas fa-pencil-alt" />}
        handleClick={toggleModal}
      />
    ) : (
      <ButtonInline
        cssClass="lightgrey"
        title={currentAbout}
        displayText="add about team"
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
  currentAbout: PropTypes.string.isRequired,

  handleSave: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalEditFeeling;
