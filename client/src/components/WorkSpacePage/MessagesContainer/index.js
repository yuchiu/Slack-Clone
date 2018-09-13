import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./index.scss";
import Message from "./Message";
import { messageAction } from "@/actions";

class MessagesContainer extends React.Component {
  state = {
    isMessageFetched: false,
    currentChannelParams: 0
  };

  componentDidMount() {
    const { receiveChannelMessage } = this.props;
    receiveChannelMessage();
  }

  componentDidUpdate() {
    const {
      getChannelMessageList,
      currentChannel,
      match: { params }
    } = this.props;

    /* fetch channel message list if currentchannel exist, then set isMessageFetched to true */
    if (
      Object.keys(currentChannel).length > 0 &&
      !this.state.isMessageFetched
    ) {
      getChannelMessageList(currentChannel.id);
      this.setState({ isMessageFetched: true });
    }

    /* refetch channel message again if channel has changed */
    if (this.state.currentChannelParams !== params.channelId) {
      this.setState({
        currentChannelParams: params.channelId,
        isMessageFetched: false
      });
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
MessagesContainer.propTypes = {};

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

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MessagesContainer)
);
