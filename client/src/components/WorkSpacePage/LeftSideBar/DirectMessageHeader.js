import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

class DirectMessageHeader extends React.Component {
  state = {};

  render() {
    const { toggleAddDirectMessageModal } = this.props;
    return (
      <h1 className="leftsidebar__List__header">
        DIRECT MESSAGES
        <Icon
          className="leftsidebar__List__header__icon leftsidebar__List__header__icon--closer"
          onClick={toggleAddDirectMessageModal}
          name="plus circle"
        />
      </h1>
    );
  }
}
DirectMessageHeader.propTypes = {};

export default DirectMessageHeader;
