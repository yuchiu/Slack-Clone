import React from "react";
import PropTypes from "prop-types";

import MessageGroupHeader from "./MessageGroupHeader.jsx";
import MessageGroupList from "./MessageGroupList.jsx";

class SidebarList extends React.PureComponent {
  render() {
    const {
      toggleAddMessageGroupModal,

      teamId,
      messageGroupList,
      messageGroupMemberList,

      switchTargetUser,
      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <ul className="leftsidebar__List">
        <MessageGroupHeader
          toggleAddMessageGroupModal={toggleAddMessageGroupModal}
        />
        <MessageGroupList
          teamId={teamId}
          messageGroupList={messageGroupList}
          switchTargetUser={switchTargetUser}
          switchChannel={switchChannel}
          messageGroupMemberList={messageGroupMemberList}
          switchRightSidebarView={switchRightSidebarView}
        />
      </ul>
    );
  }
}
SidebarList.propTypes = {
  toggleAddMessageGroupModal: PropTypes.func.isRequired,

  teamId: PropTypes.number.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default SidebarList;
