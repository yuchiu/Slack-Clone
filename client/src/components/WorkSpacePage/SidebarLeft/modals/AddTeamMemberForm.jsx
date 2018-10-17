import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline } from "@/components/common";

const ModalAddTeamMember = ({
  formFields,
  clientErrors,

  handleChange,
  toggleModal,
  handleSubmit
}) => (
  <Form>
    <Form.Field>
      <label>Add user to the team:</label>
      <Input
        value={formFields.username}
        onChange={handleChange}
        name="username"
        fluid
        placeholder="# username"
      />
      {clientErrors.username && <ErrorInline text={clientErrors.username} />}
    </Form.Field>
    <br />
    <Form.Group widths="equal">
      <Button primary type="button" onClick={handleSubmit} fluid>
        Invite
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

ModalAddTeamMember.propTypes = {
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ModalAddTeamMember;
