import { connect } from "react-redux";

import { teamSelector, channelSelector } from "@/reducers/selectors";
import { channelAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditPurpose from "./ModalEditPurpose.jsx";

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

const formDataToProps = () => ({
  formFields: { purpose: "" },
  fieldsToValidate: ["purpose"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditPurpose)));
