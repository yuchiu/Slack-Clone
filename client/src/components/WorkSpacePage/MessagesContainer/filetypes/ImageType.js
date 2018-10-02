import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

class ImageType extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <img className="image-type" src={url} alt="" />
        <br />
        <a href={url} target="blank">
          <Icon className="file image" />
          File Link
        </a>
      </React.Fragment>
    );
  }
}

ImageType.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageType;
