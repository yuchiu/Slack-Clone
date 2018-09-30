import React from "react";
import PropTypes from "prop-types";

class SiderbarHeader extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <React.Fragment>
        <div className="header-section">{text}</div>
      </React.Fragment>
    );
  }
}

SiderbarHeader.propTypes = {};

export default SiderbarHeader;
