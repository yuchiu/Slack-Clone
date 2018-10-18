import React from "react";
import PropTypes from "prop-types";

import { ButtonOutline } from "@/components/common";
import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";

const UserProfileView = ({ targetUser, handleClick }) => (
  <React.Fragment>
    {targetUser && (
      <React.Fragment>
        <div className="view-pic">
          <img
            alt="profile-pig"
            className="view-pic__img"
            src={targetUser.avatarurl}
          />
        </div>
        <div className="view-header">
          <span className="view-header__name  right-sidebar-item">
            {targetUser.username}
            <OnlineStatusBubble on={true} />
          </span>
          <br />
          <br />
          <div className="view-header__brief-description  right-sidebar-item">
            <span className="right-sidebar-label">feeling: </span>
            {`${targetUser.brief_description}`}
          </div>
          <br />
          <ButtonOutline
            cssClass="right-sidebar-item"
            text="Direct Message"
            handleClick={handleClick}
          />
        </div>

        <div className="view-detail">
          <div className="view-detail__email  right-sidebar-item">
            <span className="right-sidebar-label ">Email: </span>
            {`${targetUser.email}`}
          </div>
          <br />
          <div className="view-header__detail-description  right-sidebar-item">
            <span className="right-sidebar-label">
              About {targetUser.username}:{" "}
            </span>
            {`${targetUser.detail_description}`}
          </div>
          <br />
        </div>
      </React.Fragment>
    )}
  </React.Fragment>
);

UserProfileView.propTypes = {
  targetUser: PropTypes.object,

  handleClick: PropTypes.func.isRequired
};

export default UserProfileView;
