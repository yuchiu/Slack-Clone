import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

import "./EditMyProfileModal.scss";
import { validateForm } from "@/utils";
import { userAction, errorAction } from "@/actions";
import { userSelector } from "@/reducers/selectors";
import { InlineError, InlineHint } from "@/components/common";

class EditMyProfileModal extends React.PureComponent {
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

  uploadeFile(files) {
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
  }

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
      <React.Fragment>
        {isModalOpen && (
          <Modal size="large" open={isModalOpen} onClose={this.toggleModalOpen}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>
                    User Avatar
                    {changeAvatar ? (
                      <span
                        className="edit-toggle-button edit-toggle-button--avatar"
                        onClick={this.toggleChangeAvatar}
                      >
                        Cancel New Avatar
                      </span>
                    ) : (
                      <span
                        className="edit-toggle-button edit-toggle-button--avatar"
                        onClick={this.toggleChangeAvatar}
                      >
                        Upload New Avatar
                      </span>
                    )}
                  </label>
                  <div className="modal-avatar">
                    {changeAvatar ? (
                      <React.Fragment>
                        {!isImgUploaded ? (
                          <React.Fragment>
                            <Dropzone
                              className="modal-avatar__dropzone-section"
                              onDrop={this.uploadeFile.bind(this)}
                            >
                              <img
                                src={currentUser.avatarurl}
                                className="modal-avatar__dropzone-section__img"
                                alt="user-profile-pic"
                              />
                              <p className="modal-avatar__dropzone-section__hint">
                                Click or Drag <br />
                                to upload image.
                              </p>
                            </Dropzone>
                            <InlineHint
                              text={
                                "Avatar image resolution are 400 x 400 pixels"
                              }
                            />
                          </React.Fragment>
                        ) : (
                          <div className="modal-avatar__editor">
                            <AvatarEditor
                              ref={this.setEditorRef}
                              image={imgFile.preview}
                              width={400}
                              height={400}
                              border={0}
                              color={[255, 255, 255, 0.6]} // RGBA
                              scale={imgScale}
                              rotate={0}
                            />
                            <div className="modal-avatar__editor__control">
                              <div
                                className="modal-avatar__editor__control__range-slider"
                                onChange={this.changeImgScale}
                              >
                                <label>Zoom:</label>
                                <input type="range" />
                              </div>{" "}
                              <div className="modal-avatar__editor__control__remove">
                                <i
                                  className="fa-times fa"
                                  onClick={this.removeUploadImg}
                                />{" "}
                                <span onClick={this.removeUploadImg}>
                                  Remove
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ) : (
                      <img
                        src={currentUser.avatarurl}
                        className="modal-avatar__img"
                        alt="user-profile-pic"
                      />
                    )}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Feeling:</label>
                  {currentUser.brief_description ? (
                    <Input
                      value={feeling}
                      onChange={this.handleChange}
                      name="feeling"
                      fluid
                      placeholder={`${currentUser.brief_description}`}
                    />
                  ) : (
                    <Input
                      value={feeling}
                      onChange={this.handleChange}
                      name="feeling"
                      fluid
                      placeholder="how you feeling"
                    />
                  )}
                  {clientError.feeling && (
                    <InlineError text={clientError.feeling} />
                  )}
                </Form.Field>
                <Form.Field>
                  <label>About You:</label>
                  {currentUser.detail_description ? (
                    <Form.TextArea
                      value={about}
                      onChange={this.handleChange}
                      name="about"
                      placeholder={`${currentUser.detail_description}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={about}
                      onChange={this.handleChange}
                      name="about"
                      placeholder="about yourself"
                    />
                  )}
                  {clientError.about && (
                    <InlineError text={clientError.about} />
                  )}
                </Form.Field>

                {!isEditPasswordOn ? (
                  <React.Fragment>
                    <label
                      className="edit-toggle-button"
                      onClick={this.toggleEditPassword}
                    >
                      Edit Password
                    </label>
                    <br />
                    <br />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <label
                      className="edit-toggle-button"
                      onClick={this.toggleEditPassword}
                    >
                      Hide Edit Password
                    </label>
                    <br />
                    <br />
                    <Form.Field>
                      <label>Password:</label>
                      <Input
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        fluid
                        placeholder={`password`}
                      />
                      {clientError.password && (
                        <InlineError text={clientError.password} />
                      )}
                    </Form.Field>

                    <Form.Field>
                      <label>New Password:</label>
                      <Input
                        value={newPassword}
                        onChange={this.handleChange}
                        name="newPassword"
                        fluid
                        placeholder="new password"
                      />
                      {clientError.newPassword && (
                        <InlineError text={clientError.newPassword} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <label>Confirm New Password:</label>
                      <Input
                        value={confirmPassword}
                        onChange={this.handleChange}
                        name="confirmPassword"
                        fluid
                        placeholder="confirm new password"
                      />
                      {clientError.confirmPassword && (
                        <InlineError text={clientError.confirmPassword} />
                      )}
                    </Form.Field>
                  </React.Fragment>
                )}

                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleSave} fluid>
                    Save
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        )}
        {!isModalOpen && (
          <button
            className="right-sidebar-button right-sidebar-item"
            onClick={this.toggleModalOpen}
          >
            Edit Profile
          </button>
        )}
      </React.Fragment>
    );
  }
}

EditMyProfileModal.propTypes = {
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
)(EditMyProfileModal);
