import React from "react";
import { OnlineStatusBubble } from "@/components/common";

class ViewMemberList extends React.Component {
  render() {
    const { memeberList } = this.props;
    return (
      <React.Fragment>
        {memeberList.map((m, i) => (
          <li key={`${m.id}-${i}`} className="member-row">
            <div className="member-row__left">
              <img
                alt="profile-img"
                className="member-row__left__img"
                src={`${m.avatarurl}`}
              />
            </div>
            <div className="member-row__right">
              <h4 className="member-row__right__name">
                {m.username}
                <OnlineStatusBubble on={true} />
              </h4>
              <h4 className="member-row__right__email">{m.email}</h4>
            </div>
          </li>
        ))}
      </React.Fragment>
    );
  }
}

ViewMemberList.propTypes = {};

export default ViewMemberList;
