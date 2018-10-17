import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { teamSelector } from "@/reducers/selectors";
import { HOCModal, HOCForm } from "@/components/common";
import ModalAddTeamMember from "./ModalAddTeamMember.jsx";

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = () => ({
  emitSocketAddTeamMember: addMemberInfo =>
    teamAction.emitSocketAddTeamMember(addMemberInfo)
});

const formDataToProps = () => ({
  formFields: { username: "" },
  fieldsToValidate: ["username"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalAddTeamMember)));
