import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";

import { TextType, ImageType, AudioType } from "./filetypes";

class Message extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={message.avatarurl} />
        <Comment.Content>
          <Comment.Author as="a">{message.username}</Comment.Author>
          <Comment.Metadata>
            <span>{message.created_at}</span>
          </Comment.Metadata>
          <br />
          {message.url ? (
            <React.Fragment>
              {message.filetype === "image" ? (
                <ImageType url={message.url} alt="image" />
              ) : null}
              {message.filetype === "text" ? (
                <TextType url={message.url} />
              ) : null}
              {message.filetype === "audio" ? (
                <AudioType url={message.url} filetype={message.filetype} />
              ) : null}
              <br />
            </React.Fragment>
          ) : (
            <Comment.Text>{message.text}</Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    );
  }
}
Message.propTypes = {};

export default Message;
