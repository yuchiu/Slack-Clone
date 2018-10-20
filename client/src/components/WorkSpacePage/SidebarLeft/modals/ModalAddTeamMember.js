import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { teamSelector } from "@/selectors/";
import { HOCModal, HOCForm } from "@/components/common";
import ModalAddTeamMember from "./ModalAddTeamMember.jsx";

class ModalAddTeamMemberContainer extends React.Component {
  checkDuplicateMember = () => {
    const { formFields, currentTeamMemberList } = this.props;
    const findMember = currentTeamMemberList.filter(
      member => member.username === formFields.username
    );
    if (findMember.length > 0) return true;
    return false;
  };

  handleSubmit = async () => {
    const {
      formFields,
      fieldsValidation,
      updateFieldErrors,
      toggleModal,
      emitSocketAddTeamMember,
      currentTeam
    } = this.props;

    const fieldErrors = fieldsValidation();
    const isMemberDuplicated = this.checkDuplicateMember();
    if (isMemberDuplicated) {
      // display error if the user is already member of the team
      updateFieldErrors({
        username: `${formFields.username} is already member of the team`
      });
    }
    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      emitSocketAddTeamMember({
        teamId: currentTeam.id,
        targetUsername: formFields.username
      });
      toggleModal();
    }
  };

  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,

      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <ModalAddTeamMember
        isModalOpen={isModalOpen}
        formFields={formFields}
        fieldErrors={fieldErrors}
        toggleModal={toggleModal}
        handleFieldChange={handleFieldChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ModalAddTeamMemberContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  updateFieldErrors: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  emitSocketAddTeamMember: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = () => ({
  emitSocketAddTeamMember: addMemberInfo =>
    teamAction.emitSocketAddTeamMember(addMemberInfo)
});

const formDataToProps = () => ({
  formFields: { username: "" },
  fieldsToValidate: ["username"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalAddTeamMemberContainer)));
