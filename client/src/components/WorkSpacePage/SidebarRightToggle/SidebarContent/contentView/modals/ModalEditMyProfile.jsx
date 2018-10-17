import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

import "./ModalEditMyProfile.scss";
import { ErrorInline, HintInline, ButtonOutline } from "@/components/common";

const ModalEditMyProfile = ({
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
  isImgUploaded,
  currentUser,

  toggleModal,
  toggleEditPassword,
  handleClose,
  handleChange,
  uploadeFile,
  handleSave,
  toggleChangeAvatar,
  changeImgScale,
  removeUploadImg,
  setEditorRef
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="large" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>
                User Avatar
                {changeAvatar ? (
                  <span
                    className="edit-toggle-button edit-toggle-button--avatar"
                    onClick={toggleChangeAvatar}
                  >
                    Cancel New Avatar
                  </span>
                ) : (
                  <span
                    className="edit-toggle-button edit-toggle-button--avatar"
                    onClick={toggleChangeAvatar}
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
                          onDrop={uploadeFile}
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
                        <HintInline
                          text={"Avatar image resolution are 400 x 400 pixels"}
                        />
                      </React.Fragment>
                    ) : (
                      <div className="modal-avatar__editor">
                        <AvatarEditor
                          ref={setEditorRef}
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
                            onChange={changeImgScale}
                          >
                            <label>Zoom:</label>
                            <input type="range" />
                          </div>{" "}
                          <div className="modal-avatar__editor__control__remove">
                            <i
                              className="fa-times fa"
                              onClick={removeUploadImg}
                            />{" "}
                            <span onClick={removeUploadImg}>Remove</span>
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
                  onChange={handleChange}
                  name="feeling"
                  fluid
                  placeholder={`${currentUser.brief_description}`}
                />
              ) : (
                <Input
                  value={feeling}
                  onChange={handleChange}
                  name="feeling"
                  fluid
                  placeholder="how you feeling"
                />
              )}
              {clientError.feeling && (
                <ErrorInline text={clientError.feeling} />
              )}
            </Form.Field>
            <Form.Field>
              <label>About You:</label>
              {currentUser.detail_description ? (
                <Form.TextArea
                  value={about}
                  onChange={handleChange}
                  name="about"
                  placeholder={`${currentUser.detail_description}`}
                />
              ) : (
                <Form.TextArea
                  value={about}
                  onChange={handleChange}
                  name="about"
                  placeholder="about yourself"
                />
              )}
              {clientError.about && <ErrorInline text={clientError.about} />}
            </Form.Field>

            {!isEditPasswordOn ? (
              <React.Fragment>
                <label
                  className="edit-toggle-button"
                  onClick={toggleEditPassword}
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
                  onClick={toggleEditPassword}
                >
                  Hide Edit Password
                </label>
                <br />
                <br />
                <Form.Field>
                  <label>Password:</label>
                  <Input
                    value={password}
                    onChange={handleChange}
                    name="password"
                    fluid
                    placeholder={`password`}
                  />
                  {clientError.password && (
                    <ErrorInline text={clientError.password} />
                  )}
                </Form.Field>

                <Form.Field>
                  <label>New Password:</label>
                  <Input
                    value={newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    fluid
                    placeholder="new password"
                  />
                  {clientError.newPassword && (
                    <ErrorInline text={clientError.newPassword} />
                  )}
                </Form.Field>
                <Form.Field>
                  <label>Confirm New Password:</label>
                  <Input
                    value={confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    fluid
                    placeholder="confirm new password"
                  />
                  {clientError.confirmPassword && (
                    <ErrorInline text={clientError.confirmPassword} />
                  )}
                </Form.Field>
              </React.Fragment>
            )}

            <Form.Group widths="equal">
              <Button type="button" primary onClick={handleSave} fluid>
                Save
              </Button>
              <Button type="button" fluid onClick={handleClose}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )}
    {!isModalOpen && (
      <ButtonOutline
        cssClass="right-sidebar-item"
        text="Edit Profile"
        handleClick={toggleModal}
      />
    )}
  </React.Fragment>
);

ModalEditMyProfile.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  feeling: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  imgFile: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  imgScale: PropTypes.number.isRequired,
  isEditPasswordOn: PropTypes.bool.isRequired,
  clientError: PropTypes.object.isRequired,
  changeAvatar: PropTypes.bool.isRequired,
  isImgUploaded: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  toggleEditPassword: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  uploadeFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  toggleChangeAvatar: PropTypes.func.isRequired,
  changeImgScale: PropTypes.func.isRequired,
  removeUploadImg: PropTypes.func.isRequired,
  setEditorRef: PropTypes.func.isRequired
};

export default ModalEditMyProfile;
