import React from "react";
import { Form, Button, Input, Header, Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineError } from "../common";

class CreateTeamForm extends React.Component {
  render() {
    const {
      handleChange,
      name,
      clientErrors,
      handleSubmit,
      about
    } = this.props;

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <Form.Field>
            <Input
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          {clientErrors.name && <InlineError text={clientErrors.name} />}
          <Form.Field>
            <Input
              name="about"
              onChange={handleChange}
              value={about}
              placeholder="About the team"
              fluid
            />
          </Form.Field>
          {clientErrors.about && <InlineError text={clientErrors.about} />}
          <br />
          <Button primary type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
CreateTeamForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  clientErrors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired
};

export default CreateTeamForm;
