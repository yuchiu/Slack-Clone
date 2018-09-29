import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";
import SidebarContainer from "./SidebarContainer";

class RightToggleSideBar extends React.Component {
  render() {
    const { children, isSideBarOpen } = this.props;
    return (
      <Sidebar.Pushable className="Sidebar-pushable" as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="right"
          vertical
          visible={isSideBarOpen}
        >
          <SidebarContainer />
        </Sidebar>

        <Sidebar.Pusher className="Sidebar-pusher">
          <Segment className="Sidebar-segment" basic>
            {children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

RightToggleSideBar.propTypes = {};

const stateToProps = state => ({
  isSideBarOpen: globalStateSelector.getIsSideBarOpen(state)
});

const dispatchToProps = dispatch => ({});
export default connect(
  stateToProps,
  dispatchToProps
)(RightToggleSideBar);
