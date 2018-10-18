import React from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import { Container } from "semantic-ui-react";

import "./CreateTeamPage.scss";
import { Navbar, ErrorInline } from "../common";
import CreateTeamForm from "./CreateTeamForm";

const CreateTeamPage = ({
  error,
  fieldErrors,
  formFields,
  isLoading,

  handleFieldChange,
  handleSubmit
}) => (
  <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
    <main className="create-team-page">
      <Navbar />
      <Container text>
        <CreateTeamForm
          fieldErrors={fieldErrors}
          formFields={formFields}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
        />
      </Container>
      {error && <ErrorInline text={error} />}
    </main>
  </LoadingOverlay>
);

CreateTeamPage.propTypes = {
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CreateTeamPage;
