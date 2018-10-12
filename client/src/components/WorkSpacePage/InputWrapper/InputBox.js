import React from "react";
import PropTypes from "prop-types";

import InputBox from "./InputBox.jsx";

class InputBoxContainer extends React.Component {
  state = {
    ENTER_KEY: 13,
    text: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleEmitSocketMessage = () => {
    const { text } = this.state;
    if (text) {
      const { emitSocketMessage, currentUser, currentChannel } = this.props;
      emitSocketMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        avatarurl: currentUser.avatarurl,
        text
      });
      this.setState({ text: "" });
    }
  };

  render() {
    const { text, ENTER_KEY } = this.state;
    const { currentChannel } = this.props;
    return (
      <InputBox
        text={text}
        ENTER_KEY={ENTER_KEY}
        currentChannel={currentChannel}
        handleChange={this.handleChange}
        handleEmitSocketMessage={this.handleEmitSocketMessage}
      />
    );
  }
}

InputBoxContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  emitSocketMessage: PropTypes.func.isRequired
};

export default InputBoxContainer;
