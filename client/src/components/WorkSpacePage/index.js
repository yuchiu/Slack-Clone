import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { sessionStore } from "@/utils";
import { teamAction } from "@/actions";
import "./index.scss";
import LeftSideBar from "./LeftSideBar";
import MainHeader from "./MainHeader";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";
import RightSideBar from "./RightSideBar";

class WorkSpacePage extends React.Component {
  componentDidMount() {
    const { getTeamAssociatedList } = this.props;
    if (this.isCurrentTeamExist()) {
      const teamId = sessionStore.getTeamId();
      getTeamAssociatedList(teamId);
    }
  }

  isCurrentTeamExist = () => {
    if (sessionStore.getTeamId() === "0") return false;
    return true;
  };

  render() {
    return (
      <React.Fragment>
        {/* redirect to create team if user is not in any team */}
        {!this.isCurrentTeamExist() && <Redirect to="create-team" />}
        {/* render workspace is currentTeam exist */}
        {this.isCurrentTeamExist() && (
          <main className="workspace-page">
            <LeftSideBar />
            <MainHeader />
            <MessagesContainer />
            <InputContainer />
            <RightSideBar />
          </main>
        )}
      </React.Fragment>
    );
  }
}

WorkSpacePage.propTypes = {
  currentTeam: PropTypes.object,
  params: PropTypes.object,
  match: PropTypes.object
};

const stateToProps = state => ({
  currentTeam: state.teamReducer.currentTeam
});

const dispatchToProps = dispatch => ({
  getTeamAssociatedList: teamId => {
    dispatch(teamAction.getTeamAssociatedList(teamId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
