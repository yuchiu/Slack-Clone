import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { globalStateAction, teamAction } from "@/actions";
import { teamSelector } from "@/reducers/selectors";
import TeamList from "./TeamList";

class RightStickySidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
  }

  toggleRightSidebar = () => {
    const { toggleRightSidebar } = this.props;
    toggleRightSidebar();
  };

  render() {
    const { teamList, switchTeam, fetchTeamAssociatedList } = this.props;
    return (
      <React.Fragment>
        <div className="right-sticky-sidebar">
          <i
            className="fa fa-bars fa-lg toggle_button"
            onClick={this.toggleRightSidebar}
          />
          <li className="sticky-sidebar-title">Teams</li>
          <TeamList
            teamList={teamList}
            switchTeam={switchTeam}
            fetchTeamAssociatedList={fetchTeamAssociatedList}
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

RightStickySidebar.propTypes = {
  teamList: PropTypes.array.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchTeam: PropTypes.func.isRequired,
  fetchTeamAssociatedList: PropTypes.func.isRequired
};

const stateToProps = state => ({
  teamList: teamSelector.getTeamList(state)
});

const dispatchToProps = dispatch => ({
  toggleRightSidebar: () => {
    dispatch(globalStateAction.toggleRightSidebar());
  },
  switchTeam: teamId => {
    dispatch(teamAction.switchTeam(teamId));
  },
  fetchTeamAssociatedList: teamId => {
    dispatch(teamAction.fetchTeamAssociatedList(teamId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(RightStickySidebar);
