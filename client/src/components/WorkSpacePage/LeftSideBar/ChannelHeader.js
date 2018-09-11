import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

class ChannelHeader extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <span>
          <Icon name="comment alternate" />
          All Threads
        </span>
        <h1 className="leftsidebar__List__header">CHANNELS</h1>
      </React.Fragment>
    );
  }
}
ChannelHeader.propTypes = {};

export default ChannelHeader;
