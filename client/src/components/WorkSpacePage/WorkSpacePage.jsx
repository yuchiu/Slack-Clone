import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

import "./WorkSpacePage.scss";
import { ErrorModal } from "@/components/common";
import SidebarLeft from "./SidebarLeft/SidebarLeft.jsx";
import InputWrapper from "./InputWrapper/InputWrapper.jsx";
import HeaderMain from "./HeaderMain/HeaderMain";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import SidebarRightSticky from "./SidebarRightSticky/SidebarRightSticky";
import SidebarRightToggle from "./SidebarRightToggle/SidebarRightToggle";

const WorkSpacePage = ({
  isSidebarOpen,
  userIsLoading,
  channelIsLoading,
  teamIsLoading,

  isCurrentTeamExist
}) => (
  <LoadingOverlay
    active={userIsLoading || channelIsLoading || teamIsLoading}
    spinner
    zIndex={10}
    text="Loading"
  >
    <React.Fragment>
      {/* redirect to create team if user is not in any team */}
      {isCurrentTeamExist ? (
        <SidebarRightToggle>
          <main
            className={`workspace-page workspace-page--sidebar-${isSidebarOpen}`}
          >
            <SidebarLeft />
            <HeaderMain />
            <MessagesWrapper />
            <InputWrapper />
            <SidebarRightSticky />
            <ErrorModal />
          </main>
        </SidebarRightToggle>
      ) : (
        <Redirect to="/create-team" />
      )}
    </React.Fragment>
  </LoadingOverlay>
);

WorkSpacePage.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  userIsLoading: PropTypes.bool.isRequired,
  channelIsLoading: PropTypes.bool.isRequired,
  teamIsLoading: PropTypes.bool.isRequired,

  isCurrentTeamExist: PropTypes.func.isRequired
};

export default WorkSpacePage;
