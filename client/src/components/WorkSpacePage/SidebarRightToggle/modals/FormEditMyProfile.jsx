import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

import { ErrorInline, HintInline } from "@/components/common";

const ModalEditMyProfile = ({
  formFields,
  formOptions,
  fieldErrors,
  currentUser,

  toggleEditPassword,
  toggleModal,
  handleFieldChange,
  uploadeFile,
  handleSave,
  toggleChangeAvatar,
  changeImgScale,
  removeUploadImg,
  setEditorRef
}) => (
  <Form>
    <Form.Field>
      <label>
        User Avatar
        {formOptions.changeAvatar ? (
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
        {formOptions.changeAvatar ? (
          <React.Fragment>
            {!formOptions.isImgUploaded ? (
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
                  image={formOptions.imgFile.preview}
                  width={400}
                  height={400}
                  border={0}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={formOptions.imgScale}
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
                    <i className="fa-times fa" onClick={removeUploadImg} />{" "}
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
          value={formFields.feeling}
          onChange={handleFieldChange}
          name="feeling"
          fluid
          placeholder={`${currentUser.brief_description}`}
        />
      ) : (
        <Input
          value={formFields.feeling}
          onChange={handleFieldChange}
          name="feeling"
          fluid
          placeholder="how you feeling"
        />
      )}
      {fieldErrors.feeling && <ErrorInline text={fieldErrors.feeling} />}
    </Form.Field>
    <Form.Field>
      <label>About You:</label>
      {currentUser.detail_description ? (
        <Form.TextArea
          value={formFields.aboutMe}
          onChange={handleFieldChange}
          name="aboutMe"
          placeholder={`${currentUser.detail_description}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.aboutMe}
          onChange={handleFieldChange}
          name="aboutMe"
          placeholder="about yourself"
        />
      )}
      {fieldErrors.aboutMe && <ErrorInline text={fieldErrors.aboutMe} />}
    </Form.Field>

    {!currentUser.provider &&
      (!formOptions.isEditPasswordOn ? (
        <React.Fragment>
          <label className="edit-toggle-button" onClick={toggleEditPassword}>
            Edit Password
          </label>
          <br />
          <br />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <label className="edit-toggle-button" onClick={toggleEditPassword}>
            Hide Edit Password
          </label>
          <br />
          <br />
          <Form.Field>
            <label>Password:</label>
            <Input
              value={formFields.password}
              onChange={handleFieldChange}
              name="password"
              type="password"
              fluid
              placeholder={`password`}
            />
            {fieldErrors.password && (
              <ErrorInline text={fieldErrors.password} />
            )}
          </Form.Field>

          <Form.Field>
            <label>New Password:</label>
            <Input
              value={formFields.newPassword}
              onChange={handleFieldChange}
              name="newPassword"
              type="password"
              fluid
              placeholder="new password"
            />
            {fieldErrors.newPassword && (
              <ErrorInline text={fieldErrors.newPassword} />
            )}
          </Form.Field>
          <Form.Field>
            <label>Confirm New Password:</label>
            <Input
              value={formFields.confirmPassword}
              onChange={handleFieldChange}
              name="confirmPassword"
              type="password"
              fluid
              placeholder="confirm new password"
            />
            {fieldErrors.confirmPassword && (
              <ErrorInline text={fieldErrors.confirmPassword} />
            )}
          </Form.Field>
        </React.Fragment>
      ))}

    <Form.Group widths="equal">
      <Button type="button" primary onClick={handleSave} fluid>
        Save
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

ModalEditMyProfile.propTypes = {
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  toggleEditPassword: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  uploadeFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  toggleChangeAvatar: PropTypes.func.isRequired,
  changeImgScale: PropTypes.func.isRequired,
  removeUploadImg: PropTypes.func.isRequired,
  setEditorRef: PropTypes.func.isRequired
};

export default ModalEditMyProfile;
