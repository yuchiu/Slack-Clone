import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import FormAddMessageGroup from "./FormAddMessageGroup";

class ModalAddMessageGroup extends React.Component {
  handleDropDownChange = (e, { value }) => {
    e.persist();
    const {
      currentTeamMemberList,
      currentUser,
      setFormFields,
      setFormOptions
    } = this.props;
    let memberNameList = currentUser.username;
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < currentTeamMemberList.length; j++) {
          if (value[i] === currentTeamMemberList[j].id) {
            memberNameList = memberNameList.concat(
              `, ${currentTeamMemberList[j].username}`
            );
          }
        }
      }
    }
    setFormFields({
      channelName: memberNameList
    });
    setFormOptions({
      members: value
    });
  };

  handleSubmit = async () => {
    // validate user's login info on client side
    const {
      setFieldErrors,
      formFields,
      formOptions,
      fetchCreateChannel,
      currentTeam,
      toggleModal,
      resetForm,
      currentUser
    } = this.props;
    const fieldErrors = validateForm.addMessageGroup(formOptions);
    setFieldErrors(fieldErrors);

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchCreateChannel({
        teamId: currentTeam.id,
        messageGroup: true,
        isPublic: false,
        currentUserId: currentUser.id,
        channelName: formFields.channelName,
        membersList: formOptions.members
      });
      toggleModal();
      resetForm();
    }
  };

  render() {
    const {
      formOptions,
      fieldErrors,
      currentUser,
      isModalOpen,
      currentTeamMemberList,

      toggleModal
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Header>Create Direct Message Group</Modal.Header>
            <Modal.Content>
              <FormAddMessageGroup
                members={formOptions.members}
                fieldErrors={fieldErrors}
                currentUser={currentUser}
                currentTeamMemberList={currentTeamMemberList}
                handleDropDownChange={this.handleDropDownChange}
                handleSubmit={this.handleSubmit}
                toggleModal={toggleModal}
              />
            </Modal.Content>
          </Modal>
        ) : (
          <Icon
            className="plus-icon"
            onClick={toggleModal}
            name="plus circle"
          />
        )}
      </React.Fragment>
    );
  }
}
ModalAddMessageGroup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  formOptions: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,

  setFieldErrors: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};
export default ModalAddMessageGroup;
