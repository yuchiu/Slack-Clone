import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./MessagesWrapper.scss";
import Message from "./Message.jsx";

class MessagesContainer extends React.Component {
  render() {
    const {
      messageList,
      isSidebarOpen,

      toggleRightSidebar,
      switchRightSidebarView,
      switchTargetUser,
      setScrollerDivRef
    } = this.props;
    return (
      <div
        className={`messages-wrapper messages-wrapper--sidebar-${isSidebarOpen}`}
        ref={setScrollerDivRef}
      >
        <Comment.Group>
          {messageList.map((message, i) => (
            <Message
              key={`${message.id}-${i}`}
              switchRightSidebarView={switchRightSidebarView}
              message={message}
              isSidebarOpen={isSidebarOpen}
              toggleRightSidebar={toggleRightSidebar}
              switchTargetUser={switchTargetUser}
            />
          ))}
        </Comment.Group>
      </div>
    );
  }
}
MessagesContainer.propTypes = {
  messageList: PropTypes.array.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,

  setScrollerDivRef: PropTypes.func.isRequired,
  switchTargetUser: PropTypes.func.isRequired,
  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default MessagesContainer;
