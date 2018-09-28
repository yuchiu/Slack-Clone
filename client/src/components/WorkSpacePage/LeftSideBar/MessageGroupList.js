import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { OnlineStatusBubble } from "@/components/common";
import { channelAction } from "@/actions";

class MessageGroupList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
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
                <li className="leftsidebar__List__link__item leftsidebar__List__link__item--link">
                  {messageGroup.showStatus && <OnlineStatusBubble on={false} />}{" "}
                  {messageGroup.name}
                </li>
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
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  }
});

export default connect(
  null,
  dispatchToProps
)(MessageGroupList);
