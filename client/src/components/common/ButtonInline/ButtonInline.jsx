import React from "react";
import PropTypes from "prop-types";

import "./ButtonInline.scss";

const ButtonInline = ({ title, icon, displayText, cssClass, handleClick }) => (
  <React.Fragment>
    {title ? <React.Fragment>{title} </React.Fragment> : null}
    <span onClick={handleClick} className={`button-inline ${cssClass}`}>
      {icon ? <React.Fragment>{icon} </React.Fragment> : null}
      {displayText}
    </span>
  </React.Fragment>
);
ButtonInline.propTypes = {
  title: PropTypes.string,
  displayText: PropTypes.string,
  cssClass: PropTypes.string,

  handleClick: PropTypes.func
};

export default ButtonInline;
