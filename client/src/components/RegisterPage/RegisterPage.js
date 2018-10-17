import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/";
import { HOCForm } from "@/components/common";
import RegisterPage from "./RegisterPage.jsx";

const stateToProps = state => ({
  isLoading: authSelector.getAuthIsLoading(state),
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => dispatch(errorAction.clearAllError()),
  fetchRegisterUser: credential => {
    dispatch(userAction.fetchRegisterUser(credential));
  }
});

const formDataToProps = () => ({
  formFields: { username: "", email: "", password: "", confirmPassword: "" },
  fieldsToValidate: ["username", "email", "password"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(RegisterPage));
