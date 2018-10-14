import React from "react";
import PropTypes from "prop-types";

import "./HintInline.scss";

const HintInline = ({ text }) => <span className="inline-hint">{text}</span>;

HintInline.propTypes = {
  text: PropTypes.string.isRequired
};

export default HintInline;
