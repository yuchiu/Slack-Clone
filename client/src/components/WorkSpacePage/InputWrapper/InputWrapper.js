import { connect } from "react-redux";

import { messageAction, errorAction } from "@/actions";
import { userSelector, channelSelector, teamSelector } from "@/reducers/";
import InputWrapper from "./InputWrapper.jsx";

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});
const dispatchToProps = dispatch => ({
  emitSocketMessage: file => {
    dispatch(messageAction.emitSocketMessage(file));
  },
  createUploadError: text => {
    dispatch(errorAction.createUploadError(text));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(InputWrapper);
