import React from "react";

class ViewUser extends React.Component {
  render() {
    const { targetMember } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="view-pic">
            <img alt="view-pic__img" src={targetMember.avatarurl} />
          </div>
          <div className="view-detail">
            <div className="view-detail__name">{targetMember.username}</div>
            <div className="view-detail__email">
              {`Email: ${targetMember.email}`}
            </div>
            <div className="view-detail__brief-description">
              {`feeling: ${targetMember.brief_description}`}
            </div>{" "}
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

ViewUser.propTypes = {};

export default ViewUser;
