import React from "react";
import PropTypes from "prop-types";

import "./WorkSpacePage.scss";
import { ErrorModal } from "@/components/common";
import SidebarLeft from "./SidebarLeft/SidebarLeft.jsx";
import InputWrapper from "./InputWrapper/InputWrapper";
import HeaderMain from "./HeaderMain/HeaderMain";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import SidebarRightSticky from "./SidebarRightSticky/SidebarRightSticky";
import SidebarRightToggle from "./SidebarRightToggle/SidebarRightToggle";

const WorkSpacePage = ({ isSidebarOpen }) => (
  <SidebarRightToggle>
    <main className={`workspace-page workspace-page--sidebar-${isSidebarOpen}`}>
      <SidebarLeft />
      <HeaderMain />
      <MessagesWrapper />
      <InputWrapper />
      <SidebarRightSticky />
      <ErrorModal />
    </main>
  </SidebarRightToggle>
);

WorkSpacePage.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

export default WorkSpacePage;
