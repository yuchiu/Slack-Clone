import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const InlineHint = ({ text }) => (
  <span className="inline-hint">
    {"  "}
    {text}
  </span>
);

InlineHint.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineHint;
