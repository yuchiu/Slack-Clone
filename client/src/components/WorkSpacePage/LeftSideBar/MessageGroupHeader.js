import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

class MessageGroupHeader extends React.Component {
  state = {};

  render() {
    const { toggleAddMessageGroupModal } = this.props;
    return (
      <h1 className="leftsidebar__List__header">
        DIRECT MESSAGES
        <Icon
          className="leftsidebar__List__header__icon leftsidebar__List__header__icon--closer"
          onClick={toggleAddMessageGroupModal}
          name="plus circle"
        />
      </h1>
    );
  }
}
MessageGroupHeader.propTypes = {};

export default MessageGroupHeader;
