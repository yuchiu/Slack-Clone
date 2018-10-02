import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

class MessageGroupHeader extends React.Component {
  state = {};

  render() {
    const { toggleAddMessageGroupModal } = this.props;
    return (
      <h1 className="leftsidebar__List__header">
        <span className="leftsidebar__List__header__title  leftsidebar__List__header__title--closer">
          DIRECT MESSAGES
        </span>
        <Icon
          className="leftsidebar__List__header__icon"
          onClick={toggleAddMessageGroupModal}
          name="plus circle"
        />
      </h1>
    );
  }
}
MessageGroupHeader.propTypes = {
  toggleAddMessageGroupModal: PropTypes.func.isRequired
};

export default MessageGroupHeader;
