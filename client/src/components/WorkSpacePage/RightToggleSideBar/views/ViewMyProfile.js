import React from "react";

class ViewTeam extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <div className="view-pic">
          <img alt="view-pic__img" src={currentUser.avatarurl} />
        </div>
        <div className="view-detail">
          <div className="view-detail__name">{currentUser.username}</div>
          <div className="view-detail__email">
            {`Email: ${currentUser.email}`}
          </div>
          <div className="view-detail__brief-description">
            {`feeling: ${currentUser.brief_description}`}
          </div>{" "}
        </div>
      </React.Fragment>
    );
  }
}

ViewTeam.propTypes = {};

export default ViewTeam;
