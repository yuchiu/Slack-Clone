import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./index.scss";
import LeftSideBar from "./LeftSideBar";
import MainHeader from "./MainHeader";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";
import RightSideBar from "./RightSideBar";

class WorkSpacePage extends React.Component {
  componentDidMount() {
    // const { teamList, getTeamData } = this.props;
    // if (teamList) {
    //   getTeamData(teamList[0]);
    // }
  }

  render() {
    const { teamList } = this.props;
    return (
      <React.Fragment>
        {/* redirect to create team if user is not in any team */}
        {!teamList && <Redirect to="create-team" />}
        <main className="workspace-page">
          <LeftSideBar />
          <MainHeader />
          <MessagesContainer />
          <InputContainer />
          <RightSideBar />
        </main>
      </React.Fragment>
    );
  }
}

WorkSpacePage.propTypes = {
  teamList: PropTypes.array.isRequired
};

const stateToProps = state => ({
  teamList: state.teamReducer.teamList
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
