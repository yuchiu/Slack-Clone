import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

class InputBox extends React.Component {
  handleEmitSocketMessage = () => {
    const {
      emitSocketMessage,
      currentUser,
      currentChannel,
      setFormFields,
      formFields
    } = this.props;

    if (formFields.text) {
      emitSocketMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        avatarurl: currentUser.avatarurl,
        text: formFields.text
      });
      setFormFields({ text: "" });
    }
  };

  render() {
    const {
      formFields,
      formOptions,
      currentChannel,
      handleFieldChange
    } = this.props;
    return (
      <Input
        className="input-box"
        fluid
        focus
        name="text"
        value={formFields.text}
        placeholder={`# ${currentChannel.name}`}
        onChange={handleFieldChange}
        onKeyDown={e => {
          if (e.keyCode === formOptions.ENTER_KEY)
            this.handleEmitSocketMessage();
        }}
      />
    );
  }
}

InputBox.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,

  setFormFields: PropTypes.func.isRequired,
  emitSocketMessage: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default InputBox;
