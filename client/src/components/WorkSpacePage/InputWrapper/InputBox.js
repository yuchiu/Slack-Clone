import React from "react";
import PropTypes from "prop-types";
import { HOCForm } from "@/components/common";
import { connect } from "react-redux";

import { messageAction } from "@/actions";
import { userSelector, channelSelector } from "@/selectors/";
import InputBox from "./InputBox.jsx";

class InputBoxContainer extends React.Component {
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
      <InputBox
        formFields={formFields}
        formOptions={formOptions}
        currentChannel={currentChannel}
        handleFieldChange={handleFieldChange}
        handleEmitSocketMessage={this.handleEmitSocketMessage}
      />
    );
  }
}

InputBoxContainer.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,

  setFormFields: PropTypes.func.isRequired,
  emitSocketMessage: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});
const dispatchToProps = dispatch => ({
  emitSocketMessage: file => {
    dispatch(messageAction.emitSocketMessage(file));
  }
});

const formDataToProps = () => ({
  formFields: {
    text: ""
  },
  formOptions: {
    ENTER_KEY: 13
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(InputBoxContainer));
