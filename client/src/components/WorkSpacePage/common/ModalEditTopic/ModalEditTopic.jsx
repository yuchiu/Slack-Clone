import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import { ButtonInline } from "@/components/common";
import EditTopicForm from "./EditTopicForm.jsx";

const ModalEditTopic = ({
  currentTopic,
  fieldErrors,
  formFields,
  isModalOpen,

  toggleModal,
  handleSave,
  handleFieldChange
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <EditTopicForm
            currentTopic={currentTopic}
            fieldErrors={fieldErrors}
            formFields={formFields}
            toggleModal={toggleModal}
            handleFieldChange={handleFieldChange}
            handleSave={handleSave}
          />
        </Modal.Content>
      </Modal>
    )}
    {!isModalOpen && currentTopic ? (
      <ButtonInline
        cssClass="lightgrey"
        title={currentTopic}
        icon={<i className="fas fa-pencil-alt" />}
        displayText="edit"
        handleClick={toggleModal}
      />
    ) : (
      <ButtonInline
        cssClass="lightgrey"
        title={currentTopic}
        icon={<i className="fas fa-pencil-alt" />}
        displayText="add a topic"
        handleClick={toggleModal}
      />
    )}
  </React.Fragment>
);

ModalEditTopic.propTypes = {
  currentTopic: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalEditTopic;
