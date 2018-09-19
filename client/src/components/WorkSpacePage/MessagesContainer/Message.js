import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";

import TextType from "./TextType";
import ImageType from "./ImageType";
import AudioType from "./AudioType";
import avatar from "@/assets/images/avatar.png";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.displayFile = this.displayFile.bind(this);
  }

  displayFile = message => {
    if (message.filetype.startsWith("image/")) {
      return <ImageType url={message.url} alt="image" />;
    }
    if (message.filetype === "text/plain") {
      return <TextType url={message.url} />;
    }
    if (message.filetype.startsWith("audio/")) {
      return <AudioType url={message.url} filetype={message.filetype} />;
    }
    return null;
  };

  render() {
    const { message } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as="a">{message.username}</Comment.Author>
          <Comment.Metadata>
            <span>{message.created_at}</span>
          </Comment.Metadata>
          {message.url ? (
            <React.Fragment>
              {this.displayFile(message)}
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
