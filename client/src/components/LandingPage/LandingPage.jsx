import React from "react";

import "./LandingPage.scss";
import { Navbar, LogoSlack } from "@/components/common";

const LandingPage = () => (
  <React.Fragment>
    <Navbar />
    <main className="landing-page">
      <h4 className="landing-header">
        Welcome to{" "}
        <b>
          <span className="landing-header--red">
            <i className="fa fa-slack" />
            Sl
          </span>
          <span className="landing-header--teal">ack</span>{" "}
          <span className="landing-header--yellow">Clo</span>
          <span className="landing-header--green">ne!</span>
        </b>
      </h4>
      <div className="landing-href-group">
        <a
          className="landing-href-group__desc"
          rel="noopener noreferrer"
          target="_blank"
          href="http://www.yuchiu.com/#showcases-wrapper"
        >
          <i className="fa fa-list-ul" />
          <b> Technical Specifications</b>
        </a>
        <a
          className="landing-href-group__github"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.github.com/yuchiu/slack-clone"
        >
          <i className="fa fa-github" />
          <b> Github</b>
        </a>
      </div>
      <div className="landing-desc">
        <div className="landing-desc__header">
          Once you are registered or Login with your social media account, you
          will be joining the Demo Team and general channel by default.
          <br />
          And... that's it! You are set to start playing around with features
          such as sending messages, creating channels and sharing files along
          with many others things!
          <br />
          Register and start the Slack Clone journey!
        </div>

        <div className="landing-desc__detail">
          Tech Stack:
          <div className="landing-desc__detail__tech-stack">
            Client Side
            <div className="landing-desc__detail__tech-stack__client">
              Reactjs ∙ Redux ∙ React-Router ∙ Redux-Thunk ∙ Reselect ∙ SCSS ∙
              Semantic UI
            </div>
            Server Side
            <div className="landing-desc__detail__tech-stack__server">
              Nodejs ∙ TypeScript ∙ Expressjs ∙ RESTful API ∙ Socket io ∙ Redis
              ∙ PostgreSQL ∙ Sequelize ∙ Nginx ∙ Docker
            </div>
          </div>
          User Stories:
          <div className="landing-desc__detail__user-story">
            Users can log in with Google or Facebook
            <br />
            Users can register and log in with their account
            <br />
            Users profile image are randomly generated once he/she is registered
            <br />
            Users can upload his/her own profile image
            <br />
            Users can edit his/her profile info including password
            <br />
            Users can create team
            <br />
            Teams description can be edited only by admin
            <br />
            Users can invite people to join their team
            <br />
            Users can create channel inside his/her team
            <br />
            Channels can be public or private for invited members only
            <br />
            Channels description can be edited
            <br />
            Users can create direct message or group message with other team
            members
            <br />
            Users can send real time message within channels or direct message
            <br />
            Users can share images, audio or text files to other users
          </div>
        </div>
      </div>
    </main>
  </React.Fragment>
);

export default LandingPage;
