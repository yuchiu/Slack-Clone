import React from "react";

import "./index.scss";

const OnlineStatusBubble = ({ on, addClass }) =>
  on ? (
    <span className={`status-bubble-on status-bubble-on--${addClass}`}>●</span>
  ) : (
    <span className={`status-bubble-off status-bubble-off--${addClass}`}>
      ○
    </span>
  );

export default OnlineStatusBubble;
