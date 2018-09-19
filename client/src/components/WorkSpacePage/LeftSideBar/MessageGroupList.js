import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { filterOutCurrentUsername } from "@/utils";
import { channelAction } from "@/actions";

class MessageGroupList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
  };

  render() {
    const { messageGroupList, teamId, currentUser } = this.props;
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
                  <Bubble />{" "}
                  {messageGroupList
                    ? filterOutCurrentUsername(
                        messageGroup.name,
                        currentUser.username
                      )
                    : null}
                </li>
              </Link>
            ))}
      </React.Fragment>
    );
  }
}
const Bubble = ({ on = true }) =>
  on ? <span className="leftsidebar__List__bubble">●</span> : "○";

MessageGroupList.propTypes = {
  messageGroupList: PropTypes.array.isRequired
};

const stateToProps = state => ({
  currentUser: state.userReducer.currentUser
});

const dispatchToProps = dispatch => ({
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MessageGroupList);
