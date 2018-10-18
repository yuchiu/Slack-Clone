import React from "react";
import PropTypes from "prop-types";

import { ModalEditAbout } from "@/components/WorkSpacePage/SidebarRightToggle/modals";

const TeamDetailView = ({
  currentTeam,
  currentTeamMemberList,
  handleClick
}) => (
  <React.Fragment>
    <div className="view-header">
      <div className="view-header__name  right-sidebar-item">
        {currentTeam.name}
      </div>
      <br />
      <div className="view-header__members  right-sidebar-item">
        <i
          className="far fa-user view-header__members__icon"
          onClick={handleClick}
        />
        <span className="view-header__members__text" onClick={handleClick}>
          {" "}
          {currentTeamMemberList.length} Members
        </span>
      </div>
    </div>

    <div className="view-detail">
      <div className="view-detail__details-header  right-sidebar-item">
        Team Details
      </div>
      <div className="view-detail__brief-description  right-sidebar-item">
        <span className="right-sidebar-label">About {currentTeam.name}: </span>
        {currentTeam.admin ? (
          <ModalEditAbout currentAbout={currentTeam.brief_description} />
        ) : (
          <span>{`${currentTeam.brief_description}`}</span>
        )}
      </div>
      <div className="view-detail__role  right-sidebar-item">
        <span className="right-sidebar-label">Role: </span>

        {currentTeam.admin
          ? `Owner of ${currentTeam.name}`
          : `Member of ${currentTeam.name}`}
      </div>
      <div className="view-detail__created-at  right-sidebar-item">
        <span className="right-sidebar-label">Created At: </span>
        {`${currentTeam.created_at}`}
      </div>
    </div>
  </React.Fragment>
);

TeamDetailView.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  handleClick: PropTypes.func.isRequired
};

export default TeamDetailView;
