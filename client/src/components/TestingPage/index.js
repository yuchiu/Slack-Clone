import React from "react";
import PropTypes from "prop-types";

import TextChanger from "./TextChanger";
import { NavBar } from "@/components/global";

const TestingPage = () => (
  <React.Fragment>
    <NavBar />
    <main className="testing-page">
      <TextChanger />
    </main>
  </React.Fragment>
);

export default TestingPage;
