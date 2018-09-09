import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import LeftSideBar from "./LeftSideBar";
import MainHeader from "./MainHeader";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";
import RightSideBar from "./RightSideBar";

class WorkSpacePage extends React.Component {
  render() {
    return (
      <div className="workspace-page">
        <LeftSideBar />
        <MainHeader />
        <MessagesContainer />
        <InputContainer />
        <RightSideBar />
      </div>
    );
  }
}

WorkSpacePage.propTypes = {
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
