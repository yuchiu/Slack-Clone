import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "@/components/global";
import Content from "./Content";

const NotFoundPage = ({
  match: {
    params: { unfoundLocation }
  }
}) => (
  <React.Fragment>
    <NavBar />
    <main className="not-found-page">
      <Content unfoundLocation={unfoundLocation} />
    </main>
  </React.Fragment>
);

NotFoundPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default NotFoundPage;
