import React from "react";
import { Icon } from "semantic-ui-react";

class AudioType extends React.Component {
  render() {
    const { url, filetype } = this.props;
    return (
      <div>
        <audio controls>
          <source src={url} type={filetype} />
        </audio>
        <br />
        <a href={url} target="blank">
          <Icon className="file audio" />
          File Link
        </a>
      </div>
    );
  }
}

export default AudioType;
