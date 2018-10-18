import React from "react";
import { Comment } from "semantic-ui-react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

import "./MessagesWrapper.scss";
import Message from "./Message";

class MessagesContainer extends React.Component {
  render() {
    const {
      messageList,
      isSidebarOpen,
      isLoading,

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
        <LoadingOverlay
          active={isLoading}
          zIndex={10}
          animate={true}
          background={"rgba(0,0,0,0.15)"}
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
        </LoadingOverlay>
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
