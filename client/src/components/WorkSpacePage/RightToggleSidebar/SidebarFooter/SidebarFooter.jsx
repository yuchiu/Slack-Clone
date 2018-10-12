import React from "react";
import PropTypes from "prop-types";

import "./SidebarFooter.scss";

class SidebarFooter extends React.Component {
  handleClick = () => {
    const { history, fetchLogoutUser } = this.props;
    fetchLogoutUser();
    history.push("/");
  };

  render() {
    return (
      <div className="right-sidebar-footer">
        <button
          className="right-sidebar-button right-sidebar-item"
          onClick={this.handleClick}
        >
          Log Out
        </button>
      </div>
    );
  }
}

SidebarFooter.propTypes = {
  history: PropTypes.object.isRequired,

  fetchLogoutUser: PropTypes.func.isRequired
};

export default SidebarFooter;
