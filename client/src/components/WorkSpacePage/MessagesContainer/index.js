import React from "react";
import { Comment } from "semantic-ui-react";
import Proptypes from "prop-types";

import "./index.scss";
import avatar from "@/assets/images/avatar.png";

class ChannelMessagesContainer extends React.Component {
  render() {
    return (
      <div className="messages-container">
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as="a">username</Comment.Author>
              <Comment.Metadata>
                <div>Aug 8, 2018</div>
              </Comment.Metadata>
              <Comment.Text>aloha!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>{" "}
          <Comment>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as="a">username</Comment.Author>
              <Comment.Metadata>
                <div>Aug 8, 2018</div>
              </Comment.Metadata>
              <Comment.Text>aloha!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}
ChannelMessagesContainer.propTypes = {};

export default ChannelMessagesContainer;
