import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { PublicOrPrivateTag } from "@/components/common";

class ChannelList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
    this.handleSwitchRightSideBarView("channel");
  };

  handleSwitchRightSideBarView = selectedView => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView(selectedView);
  };

  render() {
    const { channelList, teamId } = this.props;
    return (
      <React.Fragment>
        {channelList.map((channel, i) => (
          <Link
            className="leftsidebar__List__link"
            key={`index-${i}-channelid-${channel.id}`}
            to={`/workspace/${teamId}/${channel.id}`}
            onClick={this.handleClick.bind(this, channel.id)}
          >
            <li className="leftsidebar__List__link__item leftsidebar__List__link__item--link">
              {channel.public ? (
                <PublicOrPrivateTag publicChannel={true} />
              ) : (
                <PublicOrPrivateTag publicChannel={false} />
              )}{" "}
              {channel.name}
            </li>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}
ChannelList.propTypes = {
  channelList: PropTypes.array.isRequired,
  teamId: PropTypes.number,

  switchChannel: PropTypes.func.isRequired,
  switchRightSideBarView: PropTypes.func.isRequired
};

export default ChannelList;
