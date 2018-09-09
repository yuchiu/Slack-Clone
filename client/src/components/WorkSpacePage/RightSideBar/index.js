import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

import "./index.scss";

const RightSideBar = () => (
  <div className="rightsidebar">
    <ul className="rightsidebar__list">
      <li className="rightsidebar__list__item">T</li>
      <li className="rightsidebar__list__item">T</li>
      <li className="rightsidebar__list__item">T</li>
      <Link to="/create-team">
        <li className="rightsidebar__list__item rightsidebar__list__item--add-team">
          +
        </li>
      </Link>
    </ul>
  </div>
);

RightSideBar.propTypes = {
  teams: Proptypes.array
};

export default RightSideBar;
