import React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";

import { messageAction } from "@/actions";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = file => {
    if (file) {
      const { sendMessage, currentUser, currentChannel } = this.props;
      sendMessage({
        channelId: currentChannel.id,
        userId: currentUser.id,
        username: currentUser.username,
        file: { data: file, name: file.name, size: file.size, type: file.type }
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
        {children}
      </Dropzone>
    );
  }
}

const stateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  currentChannel: state.channelReducer.currentChannel
});
const dispatchToProps = dispatch => ({
  sendMessage: file => dispatch(messageAction.sendMessage(file))
});

export default connect(
  stateToProps,
  dispatchToProps
)(FileUpload);
