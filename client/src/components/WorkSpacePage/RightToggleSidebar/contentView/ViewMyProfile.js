import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/common";

class ViewMyProfile extends React.Component {
  render() {
    const { currentUser } = this.props;
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
          <span className="view-header__name  right-sidebar-item">
            {currentUser.username}
            <OnlineStatusBubble on={true} />
          </span>
          <br />
          <br />
          <div className="view-header__brief-description  right-sidebar-item">
            <span className="right-sidebar-label">feeling: </span>
            {`${currentUser.brief_description}`}
          </div>
          <button className="right-sidebar-button right-sidebar-item">
            Edit Profile
          </button>
        </div>
        <div className="view-detail">
          <div className="view-detail__email  right-sidebar-item">
            <span className="right-sidebar-label">Email: </span>
            {`${currentUser.email}`}
          </div>
          <div className="view-header__detail-description  right-sidebar-item">
            <span className="right-sidebar-label ">
              About {currentUser.username}:{" "}
            </span>
            {`${currentUser.detail_description}`}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewMyProfile.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default ViewMyProfile;
