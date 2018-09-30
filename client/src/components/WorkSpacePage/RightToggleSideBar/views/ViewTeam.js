import React from "react";

class ViewTeam extends React.Component {
  render() {
    const {
      currentTeam,
      currentTeamMembers,
      switchViewToMemberList
    } = this.props;
    return (
      <React.Fragment>
        <div className="view-detail">
          <div className="view-detail__name">{currentTeam.name}</div>
          <div
            className="view-detail__members"
            onClick={switchViewToMemberList}
          >
            <i className="far fa-user" />
            <span className=""> {currentTeamMembers.length}</span>
          </div>
          <div className="view-detail__brief-description">{`About: ${
            currentTeam.brief_description
          }`}</div>
          <div className="view-detail__role">
            Role:{" "}
            {currentTeam.admin
              ? `Owner of ${currentTeam.name}`
              : `Member of ${currentTeam.name}`}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewTeam.propTypes = {};

export default ViewTeam;
