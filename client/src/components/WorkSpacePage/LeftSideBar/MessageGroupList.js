import React from "react";
import PropTypes from "prop-types";

class MessageGroupList extends React.Component {
  state = {};

  render() {
    const { messageGroupList } = this.props;
    return (
      <React.Fragment>
        {messageGroupList.map(messageGroupMember => (
          <li
            key={messageGroupMember.id}
            className="leftsidebar__List__item leftsidebar__List__item--link"
          >
            <Bubble /> {messageGroupMember.username}
          </li>
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

export default MessageGroupList;
