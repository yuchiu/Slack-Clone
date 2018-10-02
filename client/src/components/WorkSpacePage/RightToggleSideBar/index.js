import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "./index.scss";
import { globalStateSelector } from "@/reducers/selectors";
import SidebarContainer from "./SidebarContainer";

class RightToggleSideBar extends React.Component {
  render() {
    const { children, isSideBarOpen } = this.props;
    return (
      <Sidebar.Pushable
        className="right-toggle-side-bar Sidebar-pushable"
        as={Segment}
      >
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

RightToggleSideBar.propTypes = {
  isSideBarOpen: PropTypes.bool.isRequired
};

const stateToProps = state => ({
  isSideBarOpen: globalStateSelector.getIsSideBarOpen(state)
});

export default connect(
  stateToProps,
  null
)(RightToggleSideBar);
