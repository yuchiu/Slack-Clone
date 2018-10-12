import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "@/utils";
import { userAction, errorAction } from "@/actions";
import { userSelector } from "@/reducers/selectors";
import EditMyProfileModal from "./EditMyProfileModal.jsx";

class EditMyProfileModalContainer extends React.PureComponent {
  state = {
    password: "",
    newPassword: "",
    confirmPassword: "",
    feeling: "",
    about: "",
    imgFile: {},

    clientError: {},
    isModalOpen: false,
    isEditPasswordOn: false,
    changeAvatar: false,
    imgScale: 1.67,
    isImgUploaded: false
  };

  componentWillUnmount() {
    this.resetState();
  }

  resetState = () => {
    this.setState({
      password: "",
      newPassword: "",
      confirmPassword: "",
      feeling: "",
      about: "",
      imgFile: {},

      clientError: {},
      isModalOpen: false,
      isEditPasswordOn: false,
      changeAvatar: false,
      imgScale: 1.67,
      isImgUploaded: false
    });
  };

  toggleModalOpen = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen
    });
  };

  toggleEditPassword = () => {
    const { isEditPasswordOn } = this.state;
    this.setState({
      clientError: {},
      password: "",
      newPassword: "",
      confirmPassword: "",
      isEditPasswordOn: !isEditPasswordOn
    });
  };

  handleClose = e => {
    this.resetState();
    this.toggleModalOpen();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  uploadeFile = files => {
    const file = files[0];
    const { createUploadError } = this.props;
    if (file.size > 1024 * 1024 * 5) {
      createUploadError("file size exceed maximum upload size of 5 mb");
      return;
    }
    if (!file.type.startsWith("image/")) {
      createUploadError("Avatar file can only be image. i.e png, jpg");
      return;
    }
    this.setState({ isImgUploaded: true });
    this.setState({
      imgFile: file
    });
  };

  handleSave = () => {
    const { password, newPassword, feeling, about } = this.state;
    const { fetchEditUser, currentUser } = this.props;
    const clientError = validateForm.editProfile(this.state);
    this.setState({ clientError });
    if (Object.keys(clientError).length === 0) {
      if (this.editor) {
        const canvasScaled = this.editor.getImageScaledToCanvas();
        const base64PngImg = canvasScaled.toDataURL("image/png");
        fetchEditUser({
          currentUserId: currentUser.id,
          imgFile: base64PngImg,
          brief_description: feeling,
          detail_description: about,
          password,
          newPassword
        });
      }

      fetchEditUser({
        brief_description: feeling,
        detail_description: about,
        password,
        newPassword
      });
      this.handleClose();
    }
  };

  toggleChangeAvatar = () => {
    this.setState({
      imgFile: {},
      changeAvatar: !this.state.changeAvatar,
      isImgUploaded: false
    });
  };

  changeImgScale = e => {
    const sliderRange = e.target.value;
    if (sliderRange / 30 > 1) {
      const imgScale = sliderRange / 30;
      this.setState({
        imgScale
      });
    }
    if (sliderRange / 30 < 1) {
      this.setState({
        imgScale: 1
      });
    }
  };

  removeUploadImg = () => {
    this.setState({
      imgFile: {},
      isImgUploaded: false
    });
  };

  // eslint-disable-next-line
  setEditorRef = editor => (this.editor = editor);

  render() {
    const {
      password,
      confirmPassword,
      feeling,
      about,
      newPassword,
      imgFile,
      isModalOpen,
      imgScale,
      isEditPasswordOn,
      clientError,
      changeAvatar,
      isImgUploaded
    } = this.state;
    const { currentUser } = this.props;
    return (
      <EditMyProfileModal
        password={password}
        confirmPassword={confirmPassword}
        feeling={feeling}
        about={about}
        newPassword={newPassword}
        imgFile={imgFile}
        isModalOpen={isModalOpen}
        imgScale={imgScale}
        isEditPasswordOn={isEditPasswordOn}
        clientError={clientError}
        changeAvatar={changeAvatar}
        isImgUploaded={isImgUploaded}
        currentUser={currentUser}
        toggleModalOpen={this.toggleModalOpen}
        toggleEditPassword={this.toggleEditPassword}
        handleClose={this.handleClose}
        handleChange={this.handleChange}
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

EditMyProfileModalContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  feeling: PropTypes.string,
  createUploadError: PropTypes.func.isRequired
};

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

export default connect(
  stateToProps,
  dispatchToProps
)(EditMyProfileModalContainer);
