import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class TeamList extends React.Component {
  handleClick = teamId => {
    const { switchTeam, getTeamAssociatedList } = this.props;
    switchTeam(teamId);
    getTeamAssociatedList(teamId);
  };

  render() {
    const { teamList } = this.props;
    return (
      <React.Fragment>
        <ul className="team-list">
          {teamList.map((team, i) => (
            <Link
              className="team-list__link"
              key={`index-${i}teamid-${team.id}`}
              to={`/workspace/${team.id}`}
              onClick={this.handleClick.bind(this, team.id)}
            >
              <li className="team-list__link__item">{team.initials}</li>
            </Link>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

TeamList.propTypes = {
  teamList: PropTypes.array.isRequired,
  switchTeam: PropTypes.func.isRequired,
  getTeamAssociatedList: PropTypes.func.isRequired
};

export default TeamList;
