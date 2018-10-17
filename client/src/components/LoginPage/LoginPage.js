import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/selectors";
import { HOCForm } from "@/components/common";
import LoginPage from "./LoginPage.jsx";

const stateToProps = state => ({
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => dispatch(errorAction.clearAllError()),
  fetchLoginUser: credential => {
    dispatch(userAction.fetchLoginUser(credential));
  }
});

const formDataToProps = () => ({
  formFields: { username: "", password: "" },
  fieldsToValidate: ["username", "password"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(LoginPage));
