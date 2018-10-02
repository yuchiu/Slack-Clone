import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
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

  sendSocketMessage = () => {
    const { text } = this.state;
    if (text) {
      const { sendSocketMessage, currentUser, currentChannel } = this.props;
      sendSocketMessage({
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
          if (e.keyCode === ENTER_KEY) this.sendSocketMessage();
        }}
      />
    );
  }
}

InputBox.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentTeamMembers: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,

  sendSocketMessage: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  sendSocketMessage: messageData => {
    dispatch(messageAction.sendSocketMessage(messageData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(InputBox);
