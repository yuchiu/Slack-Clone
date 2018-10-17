import { connect } from "react-redux";

import { errorAction } from "@/actions";
import { errorSelector } from "@/reducers/";
import ErrorModal from "./ErrorModal.jsx";

const stateToProps = state => ({
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => {
    dispatch(errorAction.clearAllError());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(ErrorModal);
