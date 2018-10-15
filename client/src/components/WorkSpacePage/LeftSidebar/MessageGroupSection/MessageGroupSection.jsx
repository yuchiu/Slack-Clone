import React from "react";
import PropTypes from "prop-types";

import MessageGroupHeader from "./MessageGroupHeader.jsx";
import MessageGroupList from "./MessageGroupList.jsx";

class SidebarList extends React.PureComponent {
  render() {
    const {
      currentTeam,
      messageGroupList,
      messageGroupMemberList,

      switchTargetUser,
      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <ul className="leftsidebar__List">
        <MessageGroupHeader />
        <MessageGroupList
          currentTeam={currentTeam}
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
  currentTeam: PropTypes.object.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default SidebarList;
