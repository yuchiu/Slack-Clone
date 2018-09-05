import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "@/components/global";

const NotFoundPage = ({ history }) => (
  <div>
    <NavBar history={history} />
    Not Found
  </div>
);

NotFoundPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default NotFoundPage;
