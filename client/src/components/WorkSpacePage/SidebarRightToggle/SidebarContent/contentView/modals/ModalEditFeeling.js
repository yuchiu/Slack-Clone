import { connect } from "react-redux";

import { userAction } from "@/actions";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditFeeling from "./ModalEditFeeling.jsx";

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  }
});

const formDataToProps = () => ({
  formFields: { feeling: "" },
  fieldsToValidate: ["feeling"]
});

export default connect(
  null,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditFeeling)));
