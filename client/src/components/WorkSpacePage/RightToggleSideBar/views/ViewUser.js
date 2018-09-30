import React from "react";

class ViewUser extends React.Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <React.Fragment>
        <div className="right-sidebar-header">My Profile</div>
        <div className="profile-img">img</div>
        <div className="username">username</div>
        <div className="">O</div>
        <div className="profile-detail">detail info</div>
        <div className="edit-profile">edit Profile</div>
        <div className="logout">
          <button onClick={handleLogout}>logout</button>
        </div>
      </React.Fragment>
    );
  }
}

ViewUser.propTypes = {};

export default ViewUser;
