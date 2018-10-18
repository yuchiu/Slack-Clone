import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ButtonInline } from "@/components/common";
import EditAboutForm from "./EditAboutForm.jsx";

class ModalEditFeeling extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      fetchEditTeam
    } = this.props;
    const fieldErrors = fieldsValidation();
    this.setState({ fieldErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditTeam({ brief_description: formFields.about });
      toggleModal();
    }
  };

  render() {
    const {
      formFields,
      isModalOpen,
      fieldErrors,
      currentAbout,

      toggleModal,
      handleChange
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <EditAboutForm
                formFields={formFields}
                handleChange={handleChange}
                handleSave={this.handleSave}
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
  }
}

ModalEditFeeling.propTypes = {
  formFields: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentAbout: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ModalEditFeeling;
