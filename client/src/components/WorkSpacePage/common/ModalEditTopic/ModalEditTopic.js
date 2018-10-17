import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { channelSelector, teamSelector } from "@/reducers/selectors";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditTopic from "./ModalEditTopic.jsx";

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
  formFields: { topic: "" },
  fieldsToValidate: ["topic"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditTopic)));
