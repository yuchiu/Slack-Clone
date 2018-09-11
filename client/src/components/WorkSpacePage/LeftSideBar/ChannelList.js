import React from "react";
import Proptypes from "prop-types";

class ChannelList extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <li className="leftsidebar__List__item leftsidebar__List__item--link">
          # channel name
        </li>{" "}
        <li className="leftsidebar__List__item leftsidebar__List__item--link">
          # channel name
        </li>{" "}
        <li className="leftsidebar__List__item leftsidebar__List__item--link">
          # channel name
        </li>
      </React.Fragment>
    );
  }
}
ChannelList.propTypes = {};

export default ChannelList;
