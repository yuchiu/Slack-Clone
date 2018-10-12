import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const InputBox = ({
  text,
  ENTER_KEY,
  currentChannel,
  handleEmitSocketMessage,
  handleChange
}) => (
  <Input
    className="input-box"
    fluid
    focus
    name="text"
    value={text}
    placeholder={`# ${currentChannel.name}`}
    onChange={handleChange}
    onKeyDown={e => {
      if (e.keyCode === ENTER_KEY) handleEmitSocketMessage();
    }}
  />
);

InputBox.propTypes = {
  currentChannel: PropTypes.object.isRequired,

  handleEmitSocketMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default InputBox;
