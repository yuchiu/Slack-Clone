import React from "react";

import "./index.scss";

const OnlineStatusBubble = ({ publicChannel, addClass }) =>
  publicChannel ? (
    <span className={`public-tag public-tag--${addClass}`}>#</span>
  ) : (
    <span className={`private-tag private-tag--${addClass}`}>
      <i className="fas fa-lock" />
    </span>
  );

export default OnlineStatusBubble;
