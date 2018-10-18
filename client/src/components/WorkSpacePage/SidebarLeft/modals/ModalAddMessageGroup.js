import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import { teamSelector, userSelector } from "@/reducers/";
import ModalAddMessageGroup from "./ModalAddMessageGroup.jsx";

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});
const dispatchToProps = dispatch => ({
  fetchCreateChannel: channelFormInfo => {
    dispatch(channelAction.fetchCreateChannel(channelFormInfo));
  }
});

const formDataToProps = () => ({
  formFields: {
    channelName: ""
  },
  formOptions: {
    members: []
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalAddMessageGroup)));
