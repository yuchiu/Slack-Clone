import React from "react";
import PropTypes from "prop-types";
import { Input, Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./index.scss";
import { messageAction } from "@/actions";
import { currentPath } from "@/utils";

class InputContainer extends React.Component {
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

  sendChannelMessage = () => {
    const { text } = this.state;
    if (text) {
      const { sendChannelMessage, currentUser, currentChannel } = this.props;
      sendChannelMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        text
      });
      this.setState({ text: "" });
    }
  };

  sendGroupMessage = () => {
    const { text } = this.state;
    if (text) {
      console.log(text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { text, ENTER_KEY } = this.state;
    const {
      currentChannel,
      match: { path }
    } = this.props;
    return (
      <div className="input-container">
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              {currentPath(path) === "channel" && (
                <Input
                  fluid
                  focus
                  name="text"
                  value={text}
                  placeholder={`# ${currentChannel.name}`}
                  onChange={this.handleChange}
                  onKeyDown={e => {
                    if (e.keyCode === ENTER_KEY) this.sendChannelMessage();
                  }}
                />
              )}
              {currentPath(path) === "direct-message" && (
                <Input
                  fluid
                  focus
                  name="text"
                  value={text}
                  placeholder={`# Someone`}
                  onChange={this.handleChange}
                  onKeyDown={e => {
                    if (e.keyCode === ENTER_KEY) this.sendGroupMessage();
                  }}
                />
              )}
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

InputContainer.propTypes = {
  placeholder: PropTypes.string
};
const stateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  currentTeamMembers: state.teamReducer.currentTeamMembers,
  currentChannel: state.channelReducer.currentChannel
});

const dispatchToProps = dispatch => ({
  sendChannelMessage: messageData =>
    dispatch(messageAction.sendChannelMessage(messageData))
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(InputContainer)
);
