import React from "react";

import "./OAuthSection.scss";

class OAuthSection extends React.Component {
  render() {
    return (
      <div>
        <a href="https://github.com/login/oauth/authorize?client_id=b8c6da26a302431d563e">
          Sign in with Github
        </a>
      </div>
    );
  }
}

export default OAuthSection;
