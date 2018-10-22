import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { messageAction, errorAction } from "@/actions";
import { userSelector, channelSelector } from "@/selectors/";

class FileUpload extends React.Component {
  handleUpload = file => {
    if (file) {
      const {
        emitSocketMessage,
        currentUser,
        currentChannel,
        createError
      } = this.props;
      if (file.size > 1024 * 1024 * 5) {
        createError("file size exceed maximum upload size of 5 mb");
        return;
      }
      if (
        !file.type.startsWith("image/") &&
        !(file.type === "text/plain") &&
        !file.type.startsWith("audio/")
      ) {
        createError("Files upload can only be in text, image, or audio type");
        return;
      }
      emitSocketMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        avatarurl: currentUser.avatarurl,
        file: {
          data: file,
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
    }
  };

  render() {
    return (
      <Dropzone
        className={`ignore `}
        onDrop={file => this.handleUpload(file[0])}
      >
        <Button icon>
          <Icon name="paperclip" />
        </Button>
      </Dropzone>
    );
  }
}

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});
const dispatchToProps = dispatch => ({
  emitSocketMessage: file => {
    dispatch(messageAction.emitSocketMessage(file));
  },
  createError: text => {
    dispatch(errorAction.createError(text));
  }
});
FileUpload.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  emitSocketMessage: PropTypes.func.isRequired,
  createError: PropTypes.func.isRequired
};

export default connect(
  stateToProps,
  dispatchToProps
)(FileUpload);
