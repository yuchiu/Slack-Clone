import React from "react";
import { Form, Input, Button, Checkbox, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline } from "@/components/common";

const FormAddChannel = ({
  formFields,
  fieldErrors,
  formOptions,
  currentTeamMemberList,
  currentUser,

  handleSubmit,
  toggleModal,
  handleDropDownChange,
  toggleCheckboxValue,
  handleFieldChange
}) => (
  <Form>
    <Form.Field>
      <label>Channel name:</label>
      <Input
        value={formFields.channelName}
        onChange={handleFieldChange}
        name="channelName"
        fluid
        placeholder="# random channel"
      />
      {fieldErrors.channelName && (
        <ErrorInline text={fieldErrors.channelName} />
      )}
    </Form.Field>
    <Form.Field>
      <Checkbox
        toggle
        value={!formOptions.isChannelPrivate}
        label="Private"
        onChange={toggleCheckboxValue}
      />
    </Form.Field>
    <Form.Field>
      <label>Purpose:</label>
      <Form.TextArea
        value={formFields.purpose}
        onChange={handleFieldChange}
        name="purpose"
        placeholder="purpose"
      />
      {fieldErrors.purpose && <ErrorInline text={fieldErrors.purpose} />}
    </Form.Field>
    {formOptions.isChannelPrivate ? (
      <Form.Field>
        <label>Select members to join your private channel:</label>{" "}
        <Dropdown
          placeholder="# username"
          fluid
          multiple
          search
          selection
          value={formOptions.members}
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
    ) : (
      <div style={{ fontSize: "20px" }}>
        <i className="users icon " />{" "}
        <span className="">{currentTeamMemberList.length} members</span>
      </div>
    )}
    <br />
    <Form.Group widths="equal">
      <Button primary type="button" onClick={handleSubmit} fluid>
        Create Channel
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

FormAddChannel.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleDropDownChange: PropTypes.func.isRequired,
  toggleCheckboxValue: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default FormAddChannel;
