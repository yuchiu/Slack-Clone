import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { validateForm } from "@/utils";
import { userAction, errorAction } from "@/actions";
import { userSelector } from "@/selectors/";
import { HOCModal, HOCForm } from "@/components/common";
import ModalEditMyProfile from "./ModalEditMyProfile.jsx";

class ModalEditMyProfileContainer extends React.Component {
  toggleEditPassword = () => {
    const { updateFormFields, updateFormOptions, formOptions } = this.props;
    updateFormFields({
      password: "",
      newPassword: "",
      confirmPassword: ""
    });
    updateFormOptions({
      isEditPasswordOn: !formOptions.isEditPasswordOn
    });
  };

  uploadeFile = files => {
    const { updateFormOptions, createError } = this.props;
    const file = files[0];
    if (file.size > 1024 * 1024 * 5) {
      createError("file size exceed maximum upload size of 5 mb");
      return;
    }
    if (!file.type.startsWith("image/")) {
      createError("Avatar file can only be image. i.e png, jpg");
      return;
    }
    updateFormOptions({ isImgUploaded: true, imgFile: file });
  };

  handleSave = () => {
    const {
      fetchEditUser,
      currentUser,
      toggleModal,
      resetForm,
      formOptions,
      setFieldErrors,
      formFields
    } = this.props;
    const formData = {
      ...formFields,
      ...formOptions
    };
    const fieldErrors = validateForm.editProfile(formData);
    setFieldErrors(fieldErrors);
    if (Object.keys(fieldErrors).length === 0) {
      if (this.editor) {
        const canvasScaled = this.editor.getImageScaledToCanvas();
        const base64PngImg = canvasScaled.toDataURL("image/png");
        fetchEditUser({
          currentUserId: currentUser.id,
          imgFile: base64PngImg,
          brief_description: formFields.feeling,
          detail_description: formFields.aboutMe,
          password: formFields.password,
          newPassword: formFields.newPassword
        });
      }

      fetchEditUser({
        currentUserId: currentUser.id,
        brief_description: formFields.feeling,
        detail_description: formFields.aboutMe,
        password: formFields.password,
        newPassword: formFields.newPassword
      });
      toggleModal();
      resetForm();
    }
  };

  toggleChangeAvatar = () => {
    const { updateFormOptions } = this.props;
    updateFormOptions({
      imgFile: {},
      changeAvatar: !updateFormOptions.changeAvatar,
      isImgUploaded: false
    });
  };

  changeImgScale = e => {
    const { updateFormOptions } = this.props;
    const sliderRange = e.target.value;
    if (sliderRange / 30 > 1) {
      const imgScale = sliderRange / 30;
      updateFormOptions({
        imgScale
      });
    }
    if (sliderRange / 30 < 1) {
      updateFormOptions({
        imgScale: 1
      });
    }
  };

  removeUploadImg = () => {
    const { updateFormOptions } = this.props;
    updateFormOptions({
      imgFile: {},
      isImgUploaded: false
    });
  };

  // eslint-disable-next-line
  setEditorRef = editor => (this.editor = editor);

  render() {
    const {
      formFields,
      formOptions,
      isModalOpen,
      fieldErrors,
      currentUser,

      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <ModalEditMyProfile
        formFields={formFields}
        formOptions={formOptions}
        isModalOpen={isModalOpen}
        fieldErrors={fieldErrors}
        currentUser={currentUser}
        toggleModal={toggleModal}
        handleFieldChange={handleFieldChange}
        toggleEditPassword={this.toggleEditPassword}
        uploadeFile={this.uploadeFile}
        handleSave={this.handleSave}
        toggleChangeAvatar={this.toggleChangeAvatar}
        changeImgScale={this.changeImgScale}
        removeUploadImg={this.removeUploadImg}
        setEditorRef={this.setEditorRef}
      />
    );
  }
}

ModalEditMyProfileContainer.propTypes = {
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,

  resetForm: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};
const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  },
  createError: text => {
    dispatch(errorAction.createError(text));
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
)(HOCModal(HOCForm(formDataToProps)(ModalEditMyProfileContainer)));
