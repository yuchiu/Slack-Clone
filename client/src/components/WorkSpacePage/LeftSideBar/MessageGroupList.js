import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { OnlineStatusBubble } from "@/components/common";
import { channelAction, globalStateAction } from "@/actions";

class MessageGroupList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
  };

  handleSwitchRightSideBarView = selectedView => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView(selectedView);
  };

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
                onClick={this.handleClick.bind(this, messageGroup.id)}
              >
                {messageGroup.directMessage ? (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.handleSwitchRightSideBarView.bind(
                      this,
                      "user-profile"
                    )}
                  >
                    <OnlineStatusBubble on={false} />
                    {"  "}
                    {messageGroup.name}
                  </li>
                ) : (
                  <li
                    className="leftsidebar__List__link__item leftsidebar__List__link__item--link"
                    onClick={this.handleSwitchRightSideBarView.bind(
                      this,
                      "message-group-members"
                    )}
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
  messageGroupList: PropTypes.array.isRequired
};

const dispatchToProps = dispatch => ({
  switchChannel: channelId => dispatch(channelAction.switchChannel(channelId)),
  switchRightSideBarView: selectedView =>
    dispatch(globalStateAction.switchRightSideBarView(selectedView))
});

export default connect(
  null,
  dispatchToProps
)(MessageGroupList);
