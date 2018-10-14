import React from "react";
import PropTypes from "prop-types";

import slackLogo32 from "@/assets/images/logos/slack-logo-32.png";
import slackLogo64 from "@/assets/images/logos/slack-logo-64.png";
import slackLogo128 from "@/assets/images/logos/slack-logo-128.png";
import slackLogo256 from "@/assets/images/logos/slack-logo-256.png";
import slackLogo512 from "@/assets/images/logos/slack-logo-512.png";

const checkSize = size => {
  switch (size) {
    case "32":
      return <img src={slackLogo32} alt="logo" />;

    case "64":
      return <img src={slackLogo64} alt="logo" />;

    case "128":
      return <img src={slackLogo128} alt="logo" />;

    case "256":
      return <img src={slackLogo256} alt="logo" />;

    case "512":
      return <img src={slackLogo512} alt="logo" />;
    default:
      return <img src={slackLogo32} alt="logo" />;
  }
};
const LogoSlack = ({ size }) => checkSize(size);

LogoSlack.propTypes = {
  size: PropTypes.string.isRequired
};

export default LogoSlack;
