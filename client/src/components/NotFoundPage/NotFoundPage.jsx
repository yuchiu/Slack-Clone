import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "@/components/common";

const NotFoundPage = ({
  match: {
    params: { unfoundLocation }
  }
}) => (
  <React.Fragment>
    <Navbar />
    <main className="not-found-page">
      <p>404! The page `{unfoundLocation}` is not found.</p>
    </main>
  </React.Fragment>
);

NotFoundPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default NotFoundPage;
