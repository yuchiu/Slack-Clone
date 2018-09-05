import React from "react";
import PropTypes from "prop-types";

const Text = ({ text }) => <div>{text}</div>;

Text.propTypes = {
  text: PropTypes.string
};

export default Text;
