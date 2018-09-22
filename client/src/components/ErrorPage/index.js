import React from "react";

import { NavBar } from "@/components/common";
import Content from "./Content";

const ErrorPage = () => (
  <React.Fragment>
    <NavBar />
    <main className="not-found-page">
      <Content />
    </main>
  </React.Fragment>
);

export default ErrorPage;
