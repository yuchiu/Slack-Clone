import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import Message from "./Message";

class ChannelMessagesContainer extends React.Component {
  render() {
    const { channelMessageList } = this.props;
    return (
      <div className="messages-container">
        <Comment.Group>
          {channelMessageList.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </Comment.Group>
      </div>
    );
  }
}
ChannelMessagesContainer.propTypes = {};

const stateToProps = state => ({
  channelMessageList: state.channelMessageReducer.channelMessageList
});

export default connect(
  stateToProps,
  null
)(ChannelMessagesContainer);
