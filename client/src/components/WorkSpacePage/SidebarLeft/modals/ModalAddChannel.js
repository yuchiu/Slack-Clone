import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import { teamSelector, userSelector } from "@/reducers/";
import ModalAddChannel from "./ModalAddChannel.jsx";

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateChannel: channelFormData => {
    dispatch(channelAction.fetchCreateChannel(channelFormData));
  }
});

const formDataToProps = () => ({
  formFields: {
    purpose: "",
    channelName: ""
  },
  formOptions: {
    isChannelPrivate: false,
    members: []
  },
  fieldsToValidate: ["purpose", "channelName"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalAddChannel)));
