import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { HOCForm } from "@/components/common";
import { errorSelector, teamSelector } from "@/reducers/";
import CreateTeamPage from "./CreateTeamPage.jsx";

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
)(HOCForm(formDataToProps)(CreateTeamPage));
