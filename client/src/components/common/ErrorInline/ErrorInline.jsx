import React from "react";
import PropTypes from "prop-types";

import "./ErrorInline.scss";

const ErrorInline = ({ text }) => (
  <span className="inline-error-span">{text}.</span>
);

ErrorInline.propTypes = {
  text: PropTypes.string.isRequired
};

export default ErrorInline;
