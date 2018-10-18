import React from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline } from "@/components/common";

const FormAddMessageGroup = ({
  members,
  fieldErrors,
  currentUser,
  currentTeamMemberList,

  handleDropDownChange,
  handleSubmit,
  toggleModal
}) => (
  <Form>
    <Form.Field>
      <label>Select members for direct messaging:</label>
      <Dropdown
        placeholder="# username"
        fluid
        multiple
        search
        selection
        value={members}
        options={currentTeamMemberList
          .filter(member => member.id !== currentUser.id)
          .map(member => ({
            key: member.id,
            value: member.id,
            text: member.username
          }))}
        onChange={handleDropDownChange}
      />
      {fieldErrors.members && <ErrorInline text={fieldErrors.members} />}
    </Form.Field>
    <br />
    <Form.Group widths="equal">
      <Button primary type="button" onClick={handleSubmit} fluid>
        Start Direct Message
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

FormAddMessageGroup.propTypes = {
  members: PropTypes.array.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  handleDropDownChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default FormAddMessageGroup;
