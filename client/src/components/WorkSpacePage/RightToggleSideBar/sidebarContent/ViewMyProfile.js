import React from "react";

import { OnlineStatusBubble } from "@/components/common";

class ViewMyProfile extends React.Component {
  render() {
    const { currentUser, handleLogout } = this.props;
    return (
      <React.Fragment>
        <div className="view-pic">
          {currentUser.avatarurl && (
            <img
              alt="profile-pig"
              className="view-pic__img"
              src={currentUser.avatarurl}
            />
          )}
        </div>
        <div className="view-header ">
          <span className="view-header__name  right-side-bar-item">
            {currentUser.username}
            <OnlineStatusBubble on={true} />
          </span>
          <br />
          <br />
          <div className="view-header__brief-description  right-side-bar-item">
            <span className="right-side-bar-label">feeling: </span>
            {`${currentUser.brief_description}`}
          </div>
          <button className="right-side-bar-button right-side-bar-item">
            Edit Profile
          </button>
        </div>
        <div className="view-detail">
          <div className="view-detail__email  right-side-bar-item">
            <span className="right-side-bar-label">Email: </span>
            {`${currentUser.email}`}
          </div>
          <div className="view-header__detail-description  right-side-bar-item">
            <span className="right-side-bar-label ">
              About {currentUser.username}:{" "}
            </span>
            {`${currentUser.detail_description}`}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewMyProfile.propTypes = {};

export default ViewMyProfile;
