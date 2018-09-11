import React from "react";
import PropTypes from "prop-types";

class ChannelList extends React.Component {
  state = {};

  render() {
    const { channelList } = this.props;
    return (
      <React.Fragment>
        {channelList.map(channel => (
          <li
            key={channel.id}
            className="leftsidebar__List__item leftsidebar__List__item--link"
          >
            {channel.name}
          </li>
        ))}
      </React.Fragment>
    );
  }
}
ChannelList.propTypes = {
  channelList: PropTypes.array.isRequired
};

export default ChannelList;
