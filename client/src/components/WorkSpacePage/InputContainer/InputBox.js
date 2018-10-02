import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./index.scss";
import { messageAction } from "@/actions";
import {
  userSelector,
  teamSelector,
  channelSelector
} from "@/reducers/selectors";

class InputBox extends React.Component {
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

  sendMessage = () => {
    const { text } = this.state;
    if (text) {
      const { sendMessage, currentUser, currentChannel } = this.props;
      sendMessage({
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
      <Input
        className="input-box"
        fluid
        focus
        name="text"
        value={text}
        placeholder={`# ${currentChannel.name}`}
        onChange={this.handleChange}
        onKeyDown={e => {
          if (e.keyCode === ENTER_KEY) this.sendMessage();
        }}
      />
    );
  }
}

InputBox.propTypes = {
  placeholder: PropTypes.string
};
const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  sendMessage: messageData => {
    dispatch(messageAction.sendMessage(messageData));
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(InputBox)
);
