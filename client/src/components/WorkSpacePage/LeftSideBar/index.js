import React from "react";
import { Icon } from "semantic-ui-react";
import Proptypes from "prop-types";

import "./index.scss";

class LeftSideBar extends React.Component {
  state = {};

  render() {
    return (
      <div className="leftsidebar">
        <div className="leftsidebar__header">
          <h1 className="leftsidebar__header__teamname">
            <Icon className="team-bell" name="bell outline" />
            team name
          </h1>
          <h1 className="leftsidebar__header__username">username</h1>
        </div>
        <ul className="leftsidebar__List">
          <span>
            <Icon name="comment alternate" />
            All Threads
          </span>
          <h1 className="leftsidebar__List__header">CHANNELS</h1>
          <li className="leftsidebar__List__item leftsidebar__List__item--link">
            # channel name
          </li>{" "}
          <li className="leftsidebar__List__item leftsidebar__List__item--link">
            # channel name
          </li>{" "}
          <li className="leftsidebar__List__item leftsidebar__List__item--link">
            # channel name
          </li>
        </ul>
        <ul className="leftsidebar__List">
          <h1 className="leftsidebar__List__header">
            DIRECT MESSAGES
            <Icon
              className="leftsidebar__List__header__icon leftsidebar__List__header__icon--closer"
              onClick={this.toggleDirectMessageModal}
              name="plus circle"
            />
          </h1>
          <li className="leftsidebar__List__item  leftsidebar__List__item--link">
            <Bubble /> username
          </li>{" "}
          <li className="leftsidebar__List__item  leftsidebar__List__item--link">
            <Bubble /> username
          </li>{" "}
          <li className="leftsidebar__List__item  leftsidebar__List__item--link">
            <Bubble /> username
          </li>
        </ul>
      </div>
    );
  }
}
const Bubble = ({ on = true }) =>
  on ? <span className="leftsidebar__List__bubble">●</span> : "○";

LeftSideBar.propTypes = {};

export default LeftSideBar;
