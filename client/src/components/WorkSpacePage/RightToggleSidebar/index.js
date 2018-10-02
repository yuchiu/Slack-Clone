import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "./index.scss";
import { globalStateSelector } from "@/reducers/selectors";
import SidebarContainer from "./SidebarContainer";

class RightToggleSidebar extends React.Component {
  render() {
    const { children, isSidebarOpen } = this.props;
    return (
      <Sidebar.Pushable
        className="right-toggle-sidebar Sidebar-pushable"
        as={Segment}
      >
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="right"
          vertical
          visible={isSidebarOpen}
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

RightToggleSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

const stateToProps = state => ({
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state)
});

export default connect(
  stateToProps,
  null
)(RightToggleSidebar);
