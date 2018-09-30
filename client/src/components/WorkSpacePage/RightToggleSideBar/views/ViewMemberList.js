import React from "react";

class ViewMemberList extends React.Component {
  render() {
    const { memeberList } = this.props;
    return (
      <React.Fragment>
        {memeberList.map((m, i) => (
          <li key={`${m.id}-${i}`}>
            <p>img</p>
            <p>{m.username}</p>
            <p>{m.email}</p>
          </li>
        ))}
      </React.Fragment>
    );
  }
}

ViewMemberList.propTypes = {};

export default ViewMemberList;
