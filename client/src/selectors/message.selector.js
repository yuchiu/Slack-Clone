import { createSelector } from "reselect";

import { getCurrentUser } from "./user.selector";

/* state selectors */
const getStateMessageList = state => state.messageReducer.messageList;

export const getHasMoreMessage = state => state.messageReducer.hasMoreMessage;

export const getMessageIsLoading = state => state.messageReducer.isLoading;

/* derived data selectors */
export const getMessageList = createSelector(
  getStateMessageList,
  getCurrentUser,
  (messageList, currentUser) =>
    messageList.map(message => {
      const newMessage = { ...message };
      newMessage.imageType = false;
      newMessage.textType = false;
      newMessage.audioType = false;
      newMessage.isCurrentUser = false;
      if (newMessage.filetype) {
        if (newMessage.filetype.startsWith("image/")) {
          newMessage.imageType = true;
        }
        if (message.filetype === "text/plain") {
          newMessage.textType = true;
        }
        if (message.filetype.startsWith("audio/")) {
          newMessage.audioType = true;
        }
      }
      if (newMessage.userId === currentUser.id) {
        newMessage.isCurrentUser = true;
      }
      return newMessage;
    })
);
