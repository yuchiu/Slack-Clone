import React from "react";
import { Form, Button, Input, Header, Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineError } from "../common";

class CreateTeamForm extends React.Component {
  render() {
    const { handleChange, name, clientErrors, handleSubmit } = this.props;

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
          <br />
          <Button primary type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CreateTeamForm;
