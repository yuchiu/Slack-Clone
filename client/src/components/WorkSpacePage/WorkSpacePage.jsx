import React from "react";
import PropTypes from "prop-types";

import "./WorkSpacePage.scss";
import { ErrorModal } from "@/components/common";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import InputWrapper from "./InputWrapper/InputWrapper";
import MainHeader from "./MainHeader/MainHeader";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import RightStickySidebar from "./RightStickySidebar/RightStickySidebar";
import RightToggleSidebar from "./RightToggleSidebar/RightToggleSidebar";

const WorkSpacePage = ({ isSidebarOpen }) => (
  <RightToggleSidebar>
    <main className={`workspace-page workspace-page--sidebar-${isSidebarOpen}`}>
      <LeftSidebar />
      <MainHeader />
      <MessagesWrapper />
      <InputWrapper />
      <RightStickySidebar />
      <ErrorModal />
    </main>
  </RightToggleSidebar>
);

WorkSpacePage.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

export default WorkSpacePage;
