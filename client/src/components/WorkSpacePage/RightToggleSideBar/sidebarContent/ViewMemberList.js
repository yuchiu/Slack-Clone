import React from "react";
import PropTypes from "prop-types";

import { OnlineStatusBubble } from "@/components/common";

class ViewMemberList extends React.Component {
  handleClick = targetUserId => {
    const {
      switchTargetUser,
      switchRightSideBarView,
      currentUser
    } = this.props;
    if (targetUserId === currentUser.id) {
      switchRightSideBarView("my-profile");
    } else {
      switchTargetUser(targetUserId);
      switchRightSideBarView("user-profile");
    }
  };

  render() {
    const { memeberList } = this.props;
    return (
      <React.Fragment>
        {memeberList.map((member, i) => (
          <li
            key={`${member.id}-${i}`}
            className="member-row"
            onClick={this.handleClick.bind(this, member.id)}
          >
            <div className="member-row__left">
              <img
                alt="profile-img"
                className="member-row__left__img"
                src={`${member.avatarurl}`}
              />
            </div>
            <div className="member-row__right">
              <h4 className="member-row__right__name">
                {member.username}
                <OnlineStatusBubble on={true} />
              </h4>
              <h4 className="member-row__right__email">{member.email}</h4>
            </div>
          </li>
        ))}
      </React.Fragment>
    );
  }
}

ViewMemberList.propTypes = {};

export default ViewMemberList;
