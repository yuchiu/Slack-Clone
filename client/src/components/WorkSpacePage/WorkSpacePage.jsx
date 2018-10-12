import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./WorkSpacePage.scss";
import LeftSidebar from "./LeftSidebar";
import InputWrapper from "./InputWrapper/InputWrapper";
import MainHeader from "./MainHeader/MainHeader";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import RightStickySidebar from "./RightStickySidebar/RightStickySidebar";
import RightToggleSidebar from "./RightToggleSidebar/RightToggleSidebar";
import ErrorModal from "./ErrorModal/ErrorModal.jsx";

const WorkSpacePage = ({
  error,
  isSidebarOpen,

  clearAllError,
  errorModalOpen,
  isCurrentTeamExist,
  toggleErrorModal
}) => (
  <React.Fragment>
    {/* redirect to create team if user is not in any team */}
    {!isCurrentTeamExist() && <Redirect to="/create-team" />}
    {/* render workspace if currentTeam exist */}
    {isCurrentTeamExist() && (
      <RightToggleSidebar>
        <main
          className={`workspace-page workspace-page--sidebar-${isSidebarOpen}`}
        >
          {error && !errorModalOpen ? toggleErrorModal() : null}
          <LeftSidebar />
          <MainHeader />
          <MessagesWrapper />
          <InputWrapper />
          <RightStickySidebar />
          <ErrorModal
            toggleErrorModal={toggleErrorModal}
            open={errorModalOpen}
            error={error}
            clearAllError={clearAllError}
            key="error-modal"
          />
        </main>
      </RightToggleSidebar>
    )}
  </React.Fragment>
);

WorkSpacePage.propTypes = {
  error: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  errorModalOpen: PropTypes.bool.isRequired,

  isCurrentTeamExist: PropTypes.func.isRequired,
  toggleErrorModal: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired
};

export default WorkSpacePage;
