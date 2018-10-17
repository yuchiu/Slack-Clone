import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ButtonInline } from "@/components/common";
import EditFeelingForm from "./EditFeelingForm.jsx";

class ModalEditFeeling extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      fetchEditUser
    } = this.props;
    const fieldErrors = fieldsValidation();
    this.setState({ fieldErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditUser({ brief_description: formFields.feeling });
      toggleModal();
    }
  };

  render() {
    const {
      formFields,
      isModalOpen,
      fieldErrors,
      currentFeeling,

      toggleModal,
      handleChange
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <EditFeelingForm
                formFields={formFields}
                handleChange={handleChange}
                handleSave={this.handleSave}
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
  }
}

ModalEditFeeling.propTypes = {
  formFields: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentFeeling: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ModalEditFeeling;
