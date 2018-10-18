import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";
import {
  ModalEditMyProfile,
  ModalEditFeeling
} from "@/components/WorkSpacePage/SidebarRightToggle/modals";

const MyProfileView = ({ currentUser }) => (
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
        <ModalEditFeeling currentFeeling={currentUser.brief_description} />
      </div>
      <ModalEditMyProfile />
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

MyProfileView.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default MyProfileView;
