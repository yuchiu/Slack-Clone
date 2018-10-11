import React from "react";

import { Navbar } from "@/components/common";

const ErrorPage = () => (
  <React.Fragment>
    <Navbar />
    <main className="not-found-page">
      <p>Error occured while loading the page.</p>
    </main>
  </React.Fragment>
);

export default ErrorPage;
