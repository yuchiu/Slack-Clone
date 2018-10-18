import React from "react";
import PropTypes from "prop-types";
import { Modal, Icon } from "semantic-ui-react";

import FormAddMessageGroup from "./FormAddMessageGroup";

class ModalAddMessageGroup extends React.Component {
  render() {
    const {
      formOptions,
      fieldErrors,
      currentUser,
      isModalOpen,
      currentTeamMemberList,

      toggleModal,
      handleDropDownChange,
      handleSubmit
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
                handleDropDownChange={handleDropDownChange}
                handleSubmit={handleSubmit}
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

  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleDropDownChange: PropTypes.func.isRequired
};
export default ModalAddMessageGroup;
