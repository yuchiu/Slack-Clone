import React from "react";

class ImageType extends React.Component {
  render() {
    const { url } = this.props;
    return <img className="image-type" src={url} alt="" />;
  }
}

export default ImageType;
