import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Header, Container } from "semantic-ui-react";

import "./CreateTeamPage.scss";
import { Navbar, InlineError } from "../common";

const CreateTeamPage = ({
  error,
  clientErrors,
  name,
  about,

  handleChange,
  handleSubmit
}) => (
  <React.Fragment>
    <Navbar />
    <main className="create-team-page">
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
      {error && <InlineError text={error} />}
    </main>
  </React.Fragment>
);

CreateTeamPage.propTypes = {
  error: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clientErrors: PropTypes.object.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default CreateTeamPage;
