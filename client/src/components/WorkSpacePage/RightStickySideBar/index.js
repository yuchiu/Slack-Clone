import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { globalStateAction, teamAction } from "@/actions";
import { teamSelector } from "@/reducers/selectors";
import TeamList from "./TeamList";

class RightStickySideBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  render() {
    const { teamList, switchTeam, getTeamAssociatedList } = this.props;
    return (
      <React.Fragment>
        <div className="right-sticky-sidebar">
          <i
            className="fa fa-bars fa-lg toggle_button"
            onClick={this.toggleSideBar}
          />
          <li className="sticky-side-bar-title">Teams</li>
          <TeamList
            teamList={teamList}
            switchTeam={switchTeam}
            getTeamAssociatedList={getTeamAssociatedList}
          />
          <Link to="/create-team">
            <li className="team-list__link__item team-list__link__item--add-team">
              +
            </li>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

RightStickySideBar.propTypes = {
  teamList: PropTypes.array.isRequired,

  toggleSideBar: PropTypes.func.isRequired,
  switchTeam: PropTypes.func.isRequired,
  getTeamAssociatedList: PropTypes.func.isRequired
};

const stateToProps = state => ({
  teamList: teamSelector.getTeamList(state)
});

const dispatchToProps = dispatch => ({
  toggleSideBar: () => {
    dispatch(globalStateAction.toggleSideBar());
  },
  switchTeam: teamId => {
    dispatch(teamAction.switchTeam(teamId));
  },
  getTeamAssociatedList: teamId => {
    dispatch(teamAction.getTeamAssociatedList(teamId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(RightStickySideBar);
