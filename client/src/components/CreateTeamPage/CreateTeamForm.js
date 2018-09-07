import React from "react";
import { Form, Button, Input, Header, Container } from "semantic-ui-react";
import Proptypes from "prop-types";

import { InlineError } from "../global";

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
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}
export default CreateTeamForm;
