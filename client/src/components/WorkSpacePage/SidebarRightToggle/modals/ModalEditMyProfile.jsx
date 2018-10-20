import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import "./ModalEditMyProfile.scss";
import { ButtonOutline } from "@/components/common";
import FormEditMyProfile from "./FormEditMyProfile";

const ModalEditMyProfile = ({
  formFields,
  formOptions,
  isModalOpen,
  fieldErrors,
  currentUser,

  toggleModal,
  handleFieldChange,
  toggleEditPassword,
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
          <FormEditMyProfile
            formFields={formFields}
            formOptions={formOptions}
            fieldErrors={fieldErrors}
            currentUser={currentUser}
            toggleModal={toggleModal}
            handleFieldChange={handleFieldChange}
            toggleEditPassword={toggleEditPassword}
            uploadeFile={uploadeFile}
            handleSave={handleSave}
            toggleChangeAvatar={toggleChangeAvatar}
            changeImgScale={changeImgScale}
            removeUploadImg={removeUploadImg}
            setEditorRef={setEditorRef}
          />
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
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleEditPassword: PropTypes.func.isRequired,
  uploadeFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  toggleChangeAvatar: PropTypes.func.isRequired,
  changeImgScale: PropTypes.func.isRequired,
  removeUploadImg: PropTypes.func.isRequired,
  setEditorRef: PropTypes.func.isRequired
};

export default ModalEditMyProfile;
