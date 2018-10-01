import React from "react";

import { OnlineStatusBubble } from "@/components/common";

class ViewUser extends React.Component {
  render() {
    const { targetMember } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="view-pic">
            <img
              alt="profile-pig"
              className="view-pic__img"
              src={targetMember.avatarurl}
            />
          </div>
          <div className="view-header">
            <span className="view-header__name  right-side-bar-item">
              {targetMember.username}
              <OnlineStatusBubble on={true} />
            </span>
            <br />
            <br />
            <div className="view-header__brief-description  right-side-bar-item">
              <span className="right-side-bar-label">feeling: </span>
              {`${targetMember.brief_description}`}
            </div>
            <br />
            <button className="right-side-bar-button right-side-bar-item ">
              message
            </button>
          </div>

          <div className="view-detail">
            <div className="view-detail__email  right-side-bar-item">
              <span className="right-side-bar-label ">Email: </span>
              {`${targetMember.email}`}
            </div>
            <br />
            <div className="view-header__detail-description  right-side-bar-item">
              <span className="right-side-bar-label">
                About: {targetMember.username}
              </span>
              {`${targetMember.detail_description}`}
            </div>
            <br />
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

ViewUser.propTypes = {};

export default ViewUser;
