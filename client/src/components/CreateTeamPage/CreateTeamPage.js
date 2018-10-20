import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { HOCForm } from "@/components/common";
import { errorSelector, teamSelector } from "@/selectors/";
import CreateTeamPage from "./CreateTeamPage.jsx";

class CreateTeamPageContainer extends React.Component {
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
      <CreateTeamPage
        error={error}
        fieldErrors={fieldErrors}
        formFields={formFields}
        isLoading={isLoading}
        handleFieldChange={handleFieldChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

CreateTeamPageContainer.propTypes = {
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isLoading: teamSelector.getTeamIsLoading(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateTeam: teamFormInfo => {
    dispatch(teamAction.fetchCreateTeam(teamFormInfo));
  }
});

const formDataToProps = () => ({
  formFields: { teamname: "", about: "" },
  fieldsToValidate: ["teamname", "about"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(CreateTeamPageContainer));
