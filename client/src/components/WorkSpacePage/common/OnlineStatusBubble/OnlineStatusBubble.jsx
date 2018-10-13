import React from "react";
import PropTypes from "prop-types";

import "./OnlineStatusBubble.scss";

const OnlineStatusBubble = ({ on, addClass }) =>
  on ? (
    <span className={`status-bubble-on status-bubble-on--${addClass}`}>●</span>
  ) : (
    <span className={`status-bubble-off status-bubble-off--${addClass}`}>
      ○
    </span>
  );
OnlineStatusBubble.propTypes = {
  on: PropTypes.bool.isRequired,
  addClass: PropTypes.string
};

export default OnlineStatusBubble;
