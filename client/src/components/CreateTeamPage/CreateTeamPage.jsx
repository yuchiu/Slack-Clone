import React from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import { Container } from "semantic-ui-react";

import "./CreateTeamPage.scss";
import { Navbar, ErrorInline } from "../common";
import CreateTeamForm from "./CreateTeamForm";

class CreateTeamPage extends React.Component {
  handleSubmit = () => {
    const {
      fieldsValidation,
      fetchCreateTeam,
      history,
      formFields
    } = this.props;
    const fieldErrors = fieldsValidation();
    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchCreateTeam({ name: formFields.teamname, about: formFields.about });
      history.push(`/`);
    }
  };

  render() {
    const {
      error,
      fieldErrors,
      formFields,
      isLoading,

      handleFieldChange
    } = this.props;
    return (
      <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
        <main className="create-team-page">
          <Navbar />
          <Container text>
            <CreateTeamForm
              fieldErrors={fieldErrors}
              formFields={formFields}
              handleFieldChange={handleFieldChange}
              handleSubmit={this.handleSubmit}
            />
          </Container>
          {error && <ErrorInline text={error} />}
        </main>
      </LoadingOverlay>
    );
  }
}

CreateTeamPage.propTypes = {
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired
};

export default CreateTeamPage;
