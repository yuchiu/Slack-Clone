import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./SidebarRightSticky.scss";
import TeamList from "./TeamList";

const SidebarRightSticky = ({
  teamList,
  switchTeam,
  fetchTeamAssociatedList,
  toggleRightSidebar
}) => (
  <React.Fragment>
    <div className="right-sticky-sidebar">
      <i
        className="fa fa-bars fa-lg toggle_button"
        onClick={toggleRightSidebar}
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

SidebarRightSticky.propTypes = {
  teamList: PropTypes.array.isRequired,

  switchTeam: PropTypes.func.isRequired,
  toggleRightSidebar: PropTypes.func.isRequired,
  fetchTeamAssociatedList: PropTypes.func.isRequired
};

export default SidebarRightSticky;
