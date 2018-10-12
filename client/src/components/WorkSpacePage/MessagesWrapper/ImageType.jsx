import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const ImageType = ({ url }) => (
  <React.Fragment>
    <img className="image-type" src={url} alt="" />
    <br />
    <a href={url} target="blank">
      <Icon className="file image" />
      File Link
    </a>
  </React.Fragment>
);

ImageType.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageType;
