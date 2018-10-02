import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { OnlineStatusBubble } from "@/components/common";

class MessageGroupList extends React.Component {
  handleSwitchChannel = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
  };

  handleSwitchRightSideBarView = () => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView("message-group-members");
  };

  handleSwitchTargetUserAndView = () => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView("user-profile");
  };

  componentDidUpdate() {
    // switch target user when channel changed
    const { switchTargetUser, messageGroupMemberList } = this.props;
    if (messageGroupMemberList[0]) {
      switchTargetUser(messageGroupMemberList[0].id);
    }
  }

  render() {
    const { messageGroupList, teamId } = this.props;
    return (
      <React.Fragment>
        {!messageGroupList
          ? null
          : messageGroupList.map((messageGroup, i) => (
              <Link
                className="leftsidebar__List__link"
                key={`index-${i}-channelid-${messageGroup.id}`}
                to={`/workspace/${teamId}/${messageGroup.id}`}
                onClick={this.handleSwitchChannel.bind(this, messageGroup.id)}
              >
                {messageGroup.directMessage ? (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.handleSwitchTargetUserAndView}
                  >
                    <OnlineStatusBubble on={false} />
                    {"  "}
                    {messageGroup.name}
                  </li>
                ) : (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.handleSwitchRightSideBarView}
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
  teamId: PropTypes.number,
  messageGroupList: PropTypes.array.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSideBarView: PropTypes.func.isRequired
};

export default MessageGroupList;
