import React from "react";
import { Redirect } from "react-router-dom";

class RedirectWorkSpacePage extends React.Component {
  render() {
    return <Redirect to="/workspace/channel" />;
  }
}

export default RedirectWorkSpacePage;
