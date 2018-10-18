import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const InputBox = ({
  formFields,
  formOptions,
  currentChannel,
  handleFieldChange,
  handleEmitSocketMessage
}) => (
  <Input
    className="input-box"
    fluid
    focus
    name="text"
    value={formFields.text}
    placeholder={`# ${currentChannel.name}`}
    onChange={handleFieldChange}
    onKeyDown={e => {
      if (e.keyCode === formOptions.ENTER_KEY) handleEmitSocketMessage();
    }}
  />
);

InputBox.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  handleEmitSocketMessage: PropTypes.func.isRequired
};

export default InputBox;
