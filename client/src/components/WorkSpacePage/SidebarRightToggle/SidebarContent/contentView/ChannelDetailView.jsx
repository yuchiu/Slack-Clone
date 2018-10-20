import React from "react";
import PropTypes from "prop-types";

import { ModalEditTopic } from "@/components/WorkSpacePage/common";
import { ModalEditPurpose } from "@/components/WorkSpacePage/SidebarRightToggle/modals";

const ChannelDetailView = ({
  currentChannel,
  currentChannelMemberList,
  handleClick
}) => (
  <React.Fragment>
    <div className="view-header">
      <div className="view-header__name right-sidebar-item">
        {currentChannel.name}
      </div>
      <br />
      <div className="view-header__members  right-sidebar-item">
        <i
          className="far fa-user view-header__members__icon"
          onClick={handleClick}
        />
        <span className="view-header__members__text" onClick={handleClick}>
          {" "}
          {currentChannelMemberList.length} Members
        </span>
      </div>
    </div>
    <div className="view-detail ">
      <div className="view-detail__details-header  right-sidebar-item">
        Channel Details
      </div>
      <div className="view-detail__brief-description  right-sidebar-item">
        <span className="right-sidebar-label">Topic: </span>
        <ModalEditTopic currentTopic={currentChannel.brief_description} />
      </div>
      <div className="view-detail__detail-description  right-sidebar-item">
        <span className="right-sidebar-label">Purpose: </span>
        <ModalEditPurpose currentPurpose={currentChannel.detail_description} />
      </div>
      <div className="view-detail__created-at  right-sidebar-item">
        <span className="right-sidebar-label">Created At: </span>
        {`${currentChannel.created_at}`}
      </div>
    </div>
  </React.Fragment>
);

ChannelDetailView.propTypes = {
  currentChannel: PropTypes.object.isRequired,
  currentChannelMemberList: PropTypes.array.isRequired,

  handleClick: PropTypes.func.isRequired
};

export default ChannelDetailView;
