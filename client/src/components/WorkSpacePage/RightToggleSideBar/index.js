import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";

class RightToggleSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

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
          <i
            className="fa fa-times fa-lg toggle_button"
            onClick={this.toggleSideBar}
          />
          <Menu.Item as="a" header>
            File Permissions
          </Menu.Item>
          <Menu.Item as="a">Share on Social</Menu.Item>
          <Menu.Item as="a">Share by E-mail</Menu.Item>
          <Menu.Item as="a">Edit Permissions</Menu.Item>
          <Menu.Item as="a">Delete Permanently</Menu.Item>
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

const dispatchToProps = dispatch => ({
  toggleSideBar: () => dispatch(globalStateAction.toggleSideBar())
});
export default connect(
  stateToProps,
  dispatchToProps
)(RightToggleSideBar);
