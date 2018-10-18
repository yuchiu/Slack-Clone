import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { userSelector } from "@/reducers/";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditMyProfile from "./ModalEditMyProfile.jsx";

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  },
  createUploadError: text => {
    dispatch(errorAction.createUploadError(text));
  }
});

const formDataToProps = () => ({
  formFields: {
    password: "",
    newPassword: "",
    confirmPassword: "",
    feeling: "",
    aboutMe: ""
  },
  formOptions: {
    imgFile: {},
    isEditPasswordOn: false,
    changeAvatar: false,
    imgScale: 1.67,
    isImgUploaded: false
  },
  fieldsToValidate: ["feeling", "aboutMe"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(HOCForm(formDataToProps)(ModalEditMyProfile)));
