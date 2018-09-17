import React from "react";
import PropTypes from "prop-types";
import { Input, Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./index.scss";
import { messageAction } from "@/actions";

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

  sendMessage = () => {
    const { text } = this.state;
    if (text) {
      const { sendMessage, currentUser, currentChannel } = this.props;
      sendMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        text
      });
      this.setState({ text: "" });
    }
  };

  render() {
    const { text, ENTER_KEY } = this.state;
    const { currentChannel } = this.props;
    return (
      <div className="input-container">
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
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
  sendMessage: messageData => dispatch(messageAction.sendMessage(messageData))
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(InputContainer)
);
