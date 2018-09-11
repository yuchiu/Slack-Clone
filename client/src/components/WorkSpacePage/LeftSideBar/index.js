import React from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import ChannelList from "./ChannelList";
import DirectMessageHeader from "./DirectMessageHeader";
import DirectMessageList from "./DirectMessageList";
import SideBarHeader from "./SideBarHeader";

class LeftSideBar extends React.Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <div className="leftsidebar">
        <SideBarHeader user={user} />
        <ul className="leftsidebar__List">
          <ChannelHeader />
          <ChannelList />
        </ul>
        <ul className="leftsidebar__List">
          <DirectMessageHeader />
          <DirectMessageList />
        </ul>
      </div>
    );
  }
}
LeftSideBar.propTypes = {};

/* user, channel, direct messages */
const stateToProps = state => ({
  user: state.userReducer.user,
  currentTeam: state.teamReducer.currentTeam
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(LeftSideBar);
