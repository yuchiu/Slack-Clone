import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { PublicOrPrivateTag } from "@/components/WorkSpacePage/common";

class ChannelList extends React.Component {
  handleClick = channelId => {
    const { switchChannel } = this.props;
    switchChannel(channelId);
    this.handleSwitchRightSidebarView("channel");
  };

  handleSwitchRightSidebarView = selectedView => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView(selectedView);
  };

  render() {
    const { channelList, currentTeam } = this.props;
    return (
      <React.Fragment>
        {channelList.map((channel, i) => (
          <Link
            className="leftsidebar__List__link"
            key={`index-${i}-channelid-${channel.id}`}
            to={`/workspace/${currentTeam.id}/${channel.id}`}
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
  currentTeam: PropTypes.object.isRequired,

  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default ChannelList;
