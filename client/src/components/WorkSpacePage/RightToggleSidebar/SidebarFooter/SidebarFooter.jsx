import React from "react";
import PropTypes from "prop-types";

import { ButtonOutline } from "@/components/common";
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
        <ButtonOutline
          handleClick={this.handleClick}
          cssClass="right-sidebar-item"
          text="Log Out"
        />
      </div>
    );
  }
}

SidebarFooter.propTypes = {
  history: PropTypes.object.isRequired,

  fetchLogoutUser: PropTypes.func.isRequired
};

export default SidebarFooter;
