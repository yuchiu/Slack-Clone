import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const PublicOrPrivateTag = ({ publicChannel, addClass }) =>
  publicChannel ? (
    <span className={`public-tag public-tag--${addClass}`}>#</span>
  ) : (
    <span className={`private-tag private-tag--${addClass}`}>
      <i className="fas fa-lock" />
    </span>
  );

PublicOrPrivateTag.propTypes = {
  publicChannel: PropTypes.bool.isRequired,
  addClass: PropTypes.string
};

export default PublicOrPrivateTag;
