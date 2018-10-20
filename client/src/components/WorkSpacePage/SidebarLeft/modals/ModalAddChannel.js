import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { validateForm } from "@/utils";
import { HOCModal, HOCForm } from "@/components/common";
import { teamSelector, userSelector } from "@/selectors/";
import ModalAddChannel from "./ModalAddChannel.jsx";

class ModalAddChannelContainer extends React.Component {
  handleSubmit = async () => {
    const {
      fetchCreateChannel,
      formFields,
      setFieldErrors,
      fieldsValidation,
      formOptions,
      currentTeam,
      resetForm,
      toggleModal,
      currentUser
    } = this.props;
    // validate user's login info on client side
    const errorList = fieldsValidation();
    const membersError = validateForm.addChannel(formOptions);
    const fieldErrors = {
      ...errorList,
      ...membersError
    };
    setFieldErrors(fieldErrors);

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchCreateChannel({
        teamId: currentTeam.id,
        currentUserId: currentUser.id,
        channelName: formFields.channelName,
        detail_description: formFields.purpose,
        isPublic: !formOptions.isChannelPrivate,
        membersList: formOptions.members
      });
      toggleModal();
      resetForm();
    }
  };

  toggleCheckboxValue = e => {
    const { updateFormOptions, formOptions } = this.props;
    updateFormOptions({
      isChannelPrivate: !formOptions.isChannelPrivate
    });
  };

  handleDropDownChange = (e, { value }) => {
    const { updateFormOptions } = this.props;
    updateFormOptions({
      members: value
    });
  };

  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,
      formOptions,
      currentTeamMemberList,
      currentUser,

      handleFieldChange,
      toggleModal
    } = this.props;
    return (
      <ModalAddChannel
        isModalOpen={isModalOpen}
        formFields={formFields}
        fieldErrors={fieldErrors}
        formOptions={formOptions}
        currentTeamMemberList={currentTeamMemberList}
        currentUser={currentUser}
        handleFieldChange={handleFieldChange}
        toggleModal={toggleModal}
        handleDropDownChange={this.handleDropDownChange}
        toggleCheckboxValue={this.toggleCheckboxValue}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ModalAddChannelContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,

  resetForm: PropTypes.func.isRequired,
  setFieldErrors: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateChannel: channelFormData => {
    dispatch(channelAction.fetchCreateChannel(channelFormData));
  }
});

const formDataToProps = () => ({
  formFields: {
    purpose: "",
    channelName: ""
  },
  formOptions: {
    isChannelPrivate: false,
    members: []
  },
  fieldsToValidate: ["purpose", "channelName"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalAddChannelContainer)));
