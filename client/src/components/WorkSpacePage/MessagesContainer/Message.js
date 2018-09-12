import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";

import avatar from "@/assets/images/avatar.png";

class Message extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as="a">{message.user.username}</Comment.Author>
          <Comment.Metadata>
            <span>{message.created_at}</span>
          </Comment.Metadata>
          <Comment.Text>{message.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}
Message.propTypes = {};

export default Message;
