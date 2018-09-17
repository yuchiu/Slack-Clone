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
    const { sendFile } = this.props;
    sendFile(file);
  };

  render() {
    const { disableClick, cssClass, children } = this.props;
    return (
      <Dropzone
        className={`ignore ${cssClass}`}
        onDrop={files => this.handleUpload(files)}
        disableClick={disableClick}
      >
        {children}
      </Dropzone>
    );
  }
}

const dispatchToProps = dispatch => ({
  sendFile: file => dispatch(messageAction.sendFile(file))
});

export default connect(
  null,
  dispatchToProps
)(FileUpload);
