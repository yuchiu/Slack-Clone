import React from "react";
import PropTypes from "prop-types";

import "./ButtonOutline.scss";

const ButtonOutline = ({ text, cssClass, handleClick }) => (
  <button className={`button-outline ${cssClass}`} onClick={handleClick}>
    {text}
  </button>
);

ButtonOutline.propTypes = {
  text: PropTypes.string,
  cssClass: PropTypes.string,

  handleClick: PropTypes.func
};

export default ButtonOutline;
