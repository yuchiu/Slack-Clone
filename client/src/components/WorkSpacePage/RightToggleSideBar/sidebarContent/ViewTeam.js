import React from "react";
import PropTypes from "prop-types";

class ViewTeam extends React.Component {
  handleClick = () => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView("channel-members");
  };

  render() {
    const { currentTeam, currentTeamMembers } = this.props;
    return (
      <React.Fragment>
        <div className="view-header">
          <div className="view-header__name  right-side-bar-item">
            {currentTeam.name}
          </div>
          <br />
          <div className="view-header__members  right-side-bar-item">
            <i
              className="far fa-user view-header__members__icon"
              onClick={this.handleClick}
            />
            <span
              className="view-header__members__text"
              onClick={this.handleClick}
            >
              {" "}
              {currentTeamMembers.length} Members
            </span>
          </div>
        </div>

        <div className="view-detail">
          <div className="view-detail__details-header  right-side-bar-item">
            Team Details
          </div>
          <div className="view-detail__brief-description  right-side-bar-item">
            <span className="right-side-bar-label">
              About {currentTeam.name}:{" "}
            </span>
            {`${currentTeam.brief_description}`}
          </div>
          <div className="view-detail__role  right-side-bar-item">
            <span className="right-side-bar-label">Role: </span>

            {currentTeam.admin
              ? `Owner of ${currentTeam.name}`
              : `Member of ${currentTeam.name}`}
          </div>
          <div className="view-detail__created-at  right-side-bar-item">
            <span className="right-side-bar-label">Created At: </span>
            {`${currentTeam.created_at}`}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewTeam.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  currentTeamMembers: PropTypes.array.isRequired,
  switchRightSideBarView: PropTypes.func.isRequired
};

export default ViewTeam;
