import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const AudioType = ({ url, filetype }) => (
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
AudioType.propTypes = {
  url: PropTypes.string.isRequired,
  filetype: PropTypes.string.isRequired
};

export default AudioType;
