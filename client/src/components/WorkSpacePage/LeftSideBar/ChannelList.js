import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { channelAction } from "@/actions";

class ChannelList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
  };

  render() {
    const { channelList, teamId } = this.props;
    return (
      <React.Fragment>
        {channelList.map((channel, i) => (
          <Link
            className="leftsidebar__List__link"
            key={`index${i}channelid${channel.id}`}
            to={`/workspace/channel/${teamId}/${channel.id}`}
            onClick={this.handleClick.bind(this, channel.id)}
          >
            <li className="leftsidebar__List__link__item leftsidebar__List__link__item--link">
              # {channel.name}
            </li>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}
ChannelList.propTypes = {
  channelList: PropTypes.array.isRequired
};
const dispatchToProps = dispatch => ({
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  }
});

export default connect(
  null,
  dispatchToProps
)(ChannelList);
