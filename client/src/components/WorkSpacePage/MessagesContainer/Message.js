import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { TextType, ImageType, AudioType } from "./filetypes";

class Message extends React.Component {
  handleClick = targetUserId => {
    const { message, switchRightSideBarView, switchTargetUser } = this.props;
    if (message.isCurrentUser) {
      switchRightSideBarView("my-profile");
    } else {
      switchTargetUser(targetUserId);
      switchRightSideBarView("user-profile");
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
            <span>{message.created_at}</span>
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
Message.propTypes = {};

const dispatchToProps = dispatch => ({
  switchTargetUser: targetUserId => {
    dispatch(globalStateAction.switchTargetUser(targetUserId));
  },
  switchRightSideBarView: selectedView => {
    dispatch(globalStateAction.switchRightSideBarView(selectedView));
  }
});

export default connect(
  null,
  dispatchToProps
)(Message);
