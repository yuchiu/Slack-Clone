import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import Message from "./Message";
import { messageAction } from "@/actions";

class ChannelMessagesContainer extends React.Component {
  state = {
    isMessageFetched: false
  };

  componentDidMount() {
    const { receiveChannelMessage } = this.props;
    receiveChannelMessage();
  }

  componentDidUpdate() {
    const { getChannelMessageList, currentChannel } = this.props;
    if (
      Object.keys(currentChannel).length > 0 &&
      !this.state.isMessageFetched
    ) {
      getChannelMessageList(currentChannel.id);
      this.setState({ isMessageFetched: true });
    }
  }

  componentWillUnmount() {
    const { clearSocketConnection } = this.props;
    clearSocketConnection();
  }

  render() {
    const { messageList } = this.props;
    return (
      <div className="messages-container">
        <Comment.Group>
          {messageList.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </Comment.Group>
      </div>
    );
  }
}
ChannelMessagesContainer.propTypes = {};

const stateToProps = state => ({
  messageList: state.messageReducer.messageList,
  currentChannel: state.channelReducer.currentChannel
});
const dispatchToProps = dispatch => ({
  getChannelMessageList: channelId => {
    dispatch(messageAction.getChannelMessageList(channelId));
  },
  clearSocketConnection: () => {
    dispatch(messageAction.clearSocketConnection());
  },
  receiveChannelMessage: () => {
    dispatch(messageAction.receiveChannelMessage());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelMessagesContainer);
