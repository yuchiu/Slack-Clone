import React from "react";

class AudioType extends React.Component {
  render() {
    const { url, filetype } = this.props;
    return (
      <div>
        <audio controls>
          <source src={url} type={filetype} />
        </audio>
      </div>
    );
  }
}

export default AudioType;
