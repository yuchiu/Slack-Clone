import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditAbout from "./ModalEditAbout.jsx";

const dispatchToProps = dispatch => ({
  fetchEditTeam: editTeamData => {
    dispatch(teamAction.fetchEditTeam(editTeamData));
  }
});

const formDataToProps = () => ({
  formFields: { about: "" },
  fieldsToValidate: ["about"]
});

export default connect(
  null,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditAbout)));
