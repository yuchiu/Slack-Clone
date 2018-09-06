import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "@/components/global";

const LandingPage = ({ history }) => (
  <div>
    <NavBar history={history} />
  </div>
);

LandingPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default LandingPage;
