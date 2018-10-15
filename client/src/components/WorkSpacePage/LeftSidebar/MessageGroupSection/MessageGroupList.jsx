import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { OnlineStatusBubble } from "@/components/WorkSpacePage/common";

class MessageGroupList extends React.Component {
  handleSwitchChannel = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
  };

  switchRightMessageGroupView = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("message-group-members");
  };

  switchTargetUserView = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("user-profile");
  };

  componentDidUpdate() {
    // switch target user when channel changed
    const { switchTargetUser, messageGroupMemberList } = this.props;
    if (messageGroupMemberList[0]) {
      switchTargetUser(messageGroupMemberList[0].id);
    }
  }

  render() {
    const { messageGroupList, currentTeam } = this.props;
    return (
      <React.Fragment>
        {!messageGroupList
          ? null
          : messageGroupList.map((messageGroup, i) => (
              <Link
                className="leftsidebar__List__link"
                key={`index-${i}-channelid-${messageGroup.id}`}
                to={`/workspace/${currentTeam.id}/${messageGroup.id}`}
                onClick={this.handleSwitchChannel.bind(this, messageGroup.id)}
              >
                {messageGroup.directMessage ? (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.switchTargetUserView}
                  >
                    <OnlineStatusBubble on={true} />
                    {"  "}
                    {messageGroup.name}
                  </li>
                ) : (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.switchRightMessageGroupView}
                  >
                    <span className="leftsidebar__List__link__item__num">
                      {messageGroup.memberNumber}
                    </span>
                    {"  "}
                    {messageGroup.name}
                  </li>
                )}
              </Link>
            ))}
      </React.Fragment>
    );
  }
}

MessageGroupList.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  messageGroupList: PropTypes.array.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default MessageGroupList;
