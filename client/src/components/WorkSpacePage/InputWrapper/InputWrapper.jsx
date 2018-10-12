import React from "react";
import PropTypes from "prop-types";

import "./InputWrapper.scss";
import FileUpload from "./FileUpload";
import InputBox from "./InputBox";

const InputWrapper = ({
  currentUser,
  currentChannel,
  emitSocketMessage,
  createUploadError
}) => (
  <div className="input-wrapper">
    <FileUpload
      currentUser={currentUser}
      currentChannel={currentChannel}
      emitSocketMessage={emitSocketMessage}
      createUploadError={createUploadError}
    />
    <InputBox
      currentUser={currentUser}
      currentChannel={currentChannel}
      emitSocketMessage={emitSocketMessage}
    />
  </div>
);

InputWrapper.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  emitSocketMessage: PropTypes.func.isRequired,
  createUploadError: PropTypes.func.isRequired
};

export default InputWrapper;
