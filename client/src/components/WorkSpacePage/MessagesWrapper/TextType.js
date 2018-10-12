import React from "react";
import PropTypes from "prop-types";

import TextType from "./TextType.jsx";

class RenderTextContainer extends React.Component {
  state = {
    text: "",
    showMore: false
  };

  componentDidMount = async () => {
    const { url } = this.props;
    const response = await fetch(url);
    const text = await response.text();
    this.setState({ text });
  };

  toggleShowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  render() {
    const { text, showMore } = this.state;
    const { url } = this.props;
    return (
      <TextType
        text={text}
        url={url}
        showMore={showMore}
        toggleShowMore={this.toggleShowMore}
      />
    );
  }
}

RenderTextContainer.propTypes = {
  url: PropTypes.string.isRequired
};

export default RenderTextContainer;
