import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { messageAction, errorAction } from "@/actions";
import { userSelector, channelSelector } from "@/reducers/selectors";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = file => {
    if (file) {
      const { sendMessage, currentUser, currentChannel, error } = this.props;
      if (file.size > 1024 * 1024 * 5) {
        const { fetchError } = this.props;
        fetchError("file size exceed maximum upload size of 5 mb");
        return;
      }
      if (
        !file.type.startsWith("image/") &&
        !(file.type === "text/plain") &&
        !file.type.startsWith("audio/")
      ) {
        const { fetchError } = this.props;
        fetchError("Files upload can only be in text, image, or audio type");
        return;
      }
      sendMessage({
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
    const { disableClick, cssClass, children } = this.props;
    return (
      <Dropzone
        className={`ignore ${cssClass}`}
        onDrop={file => this.handleUpload(file[0])}
        disableClick={disableClick}
      >
        <Button icon>
          <Icon name="paperclip" />
        </Button>
      </Dropzone>
    );
  }
}

FileUpload.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  fetchError: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});
const dispatchToProps = dispatch => ({
  sendMessage: file => {
    dispatch(messageAction.sendMessage(file));
  },
  fetchError: text => {
    dispatch(errorAction.fetchError(text));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(FileUpload);
