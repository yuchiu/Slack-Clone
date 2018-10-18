import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditFeeling from "./ModalEditFeeling.jsx";

class ModalEditFeelingContainer extends React.Component {
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
      handleFieldChange
    } = this.props;
    return (
      <ModalEditFeeling
        formFields={formFields}
        isModalOpen={isModalOpen}
        fieldErrors={fieldErrors}
        currentFeeling={currentFeeling}
        toggleModal={toggleModal}
        handleFieldChange={handleFieldChange}
        handleSave={this.handleSave}
      />
    );
  }
}

ModalEditFeelingContainer.propTypes = {
  formFields: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentFeeling: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  }
});

const formDataToProps = () => ({
  formFields: { feeling: "" },
  fieldsToValidate: ["feeling"]
});

export default connect(
  null,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditFeelingContainer)));
