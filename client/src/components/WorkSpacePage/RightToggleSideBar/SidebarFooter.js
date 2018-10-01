import React from "react";

class SidebarFooter extends React.Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <div className="right-side-bar-footer">
        <button
          className="right-side-bar-button right-side-bar-item"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    );
  }
}

SidebarFooter.propTypes = {};

export default SidebarFooter;
