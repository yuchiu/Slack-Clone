import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction } from "@/actions";
import TeamList from "./TeamList";

class RightStickySideBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  render() {
    return (
      <React.Fragment>
        <div className="right-sticky-sidebar">
          <i
            className="fa fa-bars fa-lg toggle_button"
            onClick={this.toggleSideBar}
          />
          <li className="sticky-side-bar-title">Teams</li>
          <TeamList />
          <Link to="/create-team">
            <li className="team-list__link__item team-list__link__item--add-team">
              +
            </li>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

RightStickySideBar.propTypes = {};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  toggleSideBar: () => dispatch(globalStateAction.toggleSideBar())
});
export default connect(
  stateToProps,
  dispatchToProps
)(RightStickySideBar);
