import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

class DirectMessageHeader extends React.Component {
  state = {};

  render() {
    return (
      <h1 className="leftsidebar__List__header">
        DIRECT MESSAGES
        <Icon
          className="leftsidebar__List__header__icon leftsidebar__List__header__icon--closer"
          onClick={this.toggleDirectMessageModal}
          name="plus circle"
        />
      </h1>
    );
  }
}
DirectMessageHeader.propTypes = {};

export default DirectMessageHeader;
