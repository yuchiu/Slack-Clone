import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import TeamList from "./TeamList";

class RightSideBar extends React.Component {
  render() {
    return (
      <div className="rightsidebar">
        <ul className="rightsidebar__list">
          <TeamList />
          <Link to="/create-team">
            <li className="rightsidebar__list__link__item rightsidebar__list__link__item--add-team">
              +
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

RightSideBar.propTypes = {};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});
export default connect(
  stateToProps,
  dispatchToProps
)(RightSideBar);
