import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import TextType from "./TextType";
import ImageType from "./ImageType.jsx";
import AudioType from "./AudioType.jsx";

class Message extends React.Component {
  handleClick = targetUserId => {
    const {
      message,
      switchRightSidebarView,
      switchTargetUser,
      toggleRightSidebar,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    if (message.isCurrentUser) {
      switchRightSidebarView("my-profile");
    } else {
      switchTargetUser(targetUserId);
      switchRightSidebarView("user-profile");
    }
  };

  render() {
    const { message } = this.props;
    return (
      <Comment>
        <Comment.Avatar
          as="a"
          className="comment-avatar"
          src={message.avatarurl}
          onClick={this.handleClick.bind(this, message.userId)}
        />
        <Comment.Content>
          <Comment.Author
            as="a"
            onClick={this.handleClick.bind(this, message.userId)}
          >
            {message.username}
          </Comment.Author>
          <Comment.Metadata>
            <Moment format="HH:mm MMM DD, YYYY" date={message.created_at} />
          </Comment.Metadata>
          <br />
          {message.url ? (
            <React.Fragment>
              {message.imageType && <ImageType url={message.url} alt="image" />}
              {message.textType && <TextType url={message.url} />}
              {message.audioType && (
                <AudioType url={message.url} filetype={message.filetype} />
              )}
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
Message.propTypes = {
  message: PropTypes.object.isRequired,
  switchTargetUser: PropTypes.func.isRequired
};

export default Message;
