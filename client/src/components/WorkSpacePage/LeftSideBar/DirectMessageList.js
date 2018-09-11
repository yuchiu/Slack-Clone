import React from "react";
import Proptypes from "prop-types";

class DirectMessageList extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <li className="leftsidebar__List__item  leftsidebar__List__item--link">
          <Bubble /> username
        </li>{" "}
        <li className="leftsidebar__List__item  leftsidebar__List__item--link">
          <Bubble /> username
        </li>{" "}
        <li className="leftsidebar__List__item  leftsidebar__List__item--link">
          <Bubble /> username
        </li>
      </React.Fragment>
    );
  }
}
const Bubble = ({ on = true }) =>
  on ? <span className="leftsidebar__List__bubble">●</span> : "○";

DirectMessageList.propTypes = {};

export default DirectMessageList;
