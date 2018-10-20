import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamSelector } from "@/selectors/";
import { teamAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditAbout from "./ModalEditAbout.jsx";

class ModalEditFeelingContainer extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      currentTeam,
      fetchEditTeam
    } = this.props;
    const fieldErrors = fieldsValidation();
    this.setState({ fieldErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditTeam({
        brief_description: formFields.about,
        teamId: currentTeam.id
      });
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
      handleFieldChange
    } = this.props;
    return (
      <ModalEditAbout
        formFields={formFields}
        isModalOpen={isModalOpen}
        fieldErrors={fieldErrors}
        currentAbout={currentAbout}
        toggleModal={toggleModal}
        handleFieldChange={handleFieldChange}
        handleSave={this.handleSave}
      />
    );
  }
}

ModalEditFeelingContainer.propTypes = {
  formFields: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentAbout: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};
const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state)
});

const dispatchToProps = dispatch => ({
  fetchEditTeam: editTeamData => {
    dispatch(teamAction.fetchEditTeam(editTeamData));
  }
});

const formDataToProps = () => ({
  formFields: { about: "" },
  fieldsToValidate: ["about"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditFeelingContainer)));
