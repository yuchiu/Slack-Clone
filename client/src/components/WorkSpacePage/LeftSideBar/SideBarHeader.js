import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { OnlineStatusBubble } from "@/components/common";
import globalStateAction from "../../../actions/globalState.action";

class SideBarHeader extends React.Component {
  state = {};

  handleSwitchRightSideBarView = selectedView => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView(selectedView);
  };

  render() {
    const { currentUser, currentTeam } = this.props;
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <div
            className="leftsidebar__header__top"
            onClick={this.handleSwitchRightSideBarView.bind(this, "team")}
          >
            <h1 className="leftsidebar__header__top__teamname">
              {currentTeam.name}
            </h1>
          </div>
          <div
            className="leftsidebar__header__bottom"
            onClick={this.handleSwitchRightSideBarView.bind(this, "my-profile")}
          >
            <div className="leftsidebar__header__bottom__left">
              <img
                className="leftsidebar__header__bottom__left__avatar"
                src={currentUser.avatarurl}
                alt="avatar"
              />
            </div>
            <div className="leftsidebar__header__bottom__right">
              <h1 className="leftsidebar__header__bottom__right__username">
                <OnlineStatusBubble on={true} /> {currentUser.username}
              </h1>
              {currentUser.brief_description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchToProps = dispatch => ({
  switchRightSideBarView: selectedView =>
    dispatch(globalStateAction.switchRightSideBarView(selectedView))
});

export default connect(
  null,
  dispatchToProps
)(SideBarHeader);
