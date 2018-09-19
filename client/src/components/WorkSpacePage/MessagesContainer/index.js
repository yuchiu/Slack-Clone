import React from "react";
import ReactDOM from "react-dom";
import { Comment, MessageList } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import Message from "./Message";
import { messageAction, channelAction } from "@/actions";

class MessagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMessageFetched: false,
      currentTeamParams: 0,
      allowToFetchMore: true,
      currentMessageLength: 0,
      currentChannelParams: 0
    };
  }

  componentDidMount() {
    const { receiveMessage, messageList } = this.props;
    receiveMessage();
    this.setState({
      currentMessageList: messageList.length
    });
    this.scrollerDiv.addEventListener("scroll", () => this.handleScroll());
  }

  componentDidUpdate() {
    const {
      getChannelAssociatedList,
      currentChannel,
      currentTeam
    } = this.props;
    /* fetch channel message list if currentchannel and currentTeam exist, set isMessageFetched to true */
    if (this.isCurrentDataFetched() && !this.state.isMessageFetched) {
      getChannelAssociatedList(currentChannel.id);
      this.setState({ isMessageFetched: true });
    }

    /* refetch channel message again if channel has changed */
    if (this.isCurrentDataFetched()) {
      const { currentChannelParams, currentTeamParams } = this.state;
      if (
        currentChannelParams !== currentChannel.id ||
        currentTeamParams !== currentTeam.id
      ) {
        this.setState({
          currentChannelParams: currentChannel.id,
          currentTeamParams: currentTeam.id,
          isMessageFetched: false
        });
      }
    }
  }

  componentWillUnmount() {
    const { clearSocketConnection } = this.props;
    clearSocketConnection();
  }

  isCurrentDataFetched = () => {
    const { currentChannel, currentTeam } = this.props;
    if (
      Object.keys(currentChannel).length > 0 &&
      Object.keys(currentTeam).length > 0
    ) {
      return true;
    }
    return false;
  };

  handleScroll = () => {
    const { allowToFetchMore } = this.state;
    if (this.scrollerDiv.scrollTop < 50 && allowToFetchMore) {
      this.setState({
        allowToFetchMore: false
      });
      setTimeout(() => {
        this.loadmore();
      }, 500);
      setTimeout(() => {
        this.setState({
          allowToFetchMore: true
        });
      }, 1000);
    }
  };

  loadmore = () => {
    const { messageList, fetchMoreMessage, currentChannel } = this.props;
    fetchMoreMessage({
      channelId: currentChannel.id,
      offset: messageList.length
    });
  };

  render() {
    const { messageList } = this.props;
    return (
      <div
        className="messages-container"
        ref={scrollerDiv => {
          this.scrollerDiv = scrollerDiv;
        }}
      >
        {" "}
        <Comment.Group>
          {messageList.map((message, i) => (
            <Message key={`${message.id}-${i}`} message={message} />
          ))}
        </Comment.Group>
      </div>
    );
  }
}
MessagesContainer.propTypes = {};

const stateToProps = state => ({
  messageList: state.messageReducer.messageList,
  currentTeam: state.teamReducer.currentTeam,
  currentChannel: state.channelReducer.currentChannel,
  hasMoreMessage: state.messageReducer.hasMoreMessage
});

const dispatchToProps = dispatch => ({
  getChannelAssociatedList: channelId => {
    dispatch(channelAction.getChannelAssociatedList(channelId));
  },
  fetchMoreMessage: currentMessageData => {
    dispatch(messageAction.fetchMoreMessage(currentMessageData));
  },
  clearSocketConnection: () => {
    dispatch(messageAction.clearSocketConnection());
  },
  receiveMessage: () => {
    dispatch(messageAction.receiveMessage());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MessagesContainer);
