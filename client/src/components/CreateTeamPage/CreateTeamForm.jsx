import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header } from "semantic-ui-react";

import { ErrorInline } from "../common";

const CreateTeamPage = ({
  fieldErrors,
  formFields,

  handleFieldChange,
  handleSubmit
}) => (
  <Form className="create-team-form">
    <Header as="h2">Create a team</Header>
    <Form.Field>
      <label>Name:</label>
      {fieldErrors.teamname && <ErrorInline text={fieldErrors.teamname} />}
      <Input
        name="teamname"
        onChange={handleFieldChange}
        value={formFields.teamname}
        placeholder="Name"
        fluid
      />
    </Form.Field>
    <Form.Field>
      <label>About:</label>
      {fieldErrors.about && <ErrorInline text={fieldErrors.about} />}
      <Form.TextArea
        name="about"
        onChange={handleFieldChange}
        value={formFields.about}
        placeholder="About the team"
      />
    </Form.Field>{" "}
    <br />
    <Button primary type="button" onClick={handleSubmit}>
      Submit
    </Button>
  </Form>
);

CreateTeamPage.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default CreateTeamPage;
