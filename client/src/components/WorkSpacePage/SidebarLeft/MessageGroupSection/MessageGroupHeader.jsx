import React from "react";

import { ModalAddMessageGroup } from "@/components/WorkSpacePage/SidebarLeft/modals";

const MessageGroupHeader = () => (
  <h1 className="leftsidebar__List__header">
    <span className="leftsidebar__List__header__title  leftsidebar__List__header__title--closer">
      Direct Messages
    </span>
    <ModalAddMessageGroup />
  </h1>
);
export default MessageGroupHeader;
