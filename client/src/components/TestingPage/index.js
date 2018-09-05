import React from "react";
import PropTypes from "prop-types";

import TextChanger from "./TextChanger";
import { NavBar } from "@/components/global";

const TestingPage = ({ history }) => (
  <div>
    <NavBar history={history} />
    <TextChanger />
  </div>
);

TestingPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default TestingPage;
