import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline } from "@/components/common";

const ModalAddTeamMember = ({
  isModalOpen,
  username,
  clientError,

  toggleModal,
  handleChange,
  handleClose,
  handleSubmit
}) => (
  <React.Fragment>
    {isModalOpen ? (
      <React.Fragment>
        <Modal size="small" open={isModalOpen} onClose={toggleModal}>
          <Modal.Header>Invite Team Member</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Add user to the team:</label>
                <Input
                  value={username}
                  onChange={handleChange}
                  name="username"
                  fluid
                  placeholder="# username"
                />
                {clientError.username && (
                  <ErrorInline text={clientError.username} />
                )}
              </Form.Field>
              <br />
              <Form.Group widths="equal">
                <Button primary type="button" onClick={handleSubmit} fluid>
                  Invite
                </Button>
                <Button type="button" fluid onClick={handleClose}>
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
        <div className="invite-people-button" onClick={toggleModal}>
          <span className="invite-people-button__plus">+</span> Invite People
        </div>
      </React.Fragment>
    ) : (
      <div className="invite-people-button" onClick={toggleModal}>
        <span className="invite-people-button__plus">+</span> Invite People
      </div>
    )}
  </React.Fragment>
);

ModalAddTeamMember.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  clientError: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ModalAddTeamMember;
