import constants from "@/constants";
import { createSelector } from "reselect";

const initialState = {
  messageList: []
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_CHANNEL_ASSOCIATED_LIST:
      newState.messageList = action.payload.messageList;
      return newState;

    case constants.MESSAGE_RECEIVED:
      if (
        action.payload.message.channelId === action.payload.currentChannel.id
      ) {
        newState.messageList = state.messageList.concat(action.payload.message);
      }
      return newState;

    case constants.CLEAR_SOCKET_CONNECTION:
      newState.messageList = [];
      return newState;

    case constants.FETCH_MORE_MESSAGE:
      newState.messageList = action.payload.messageList.concat(
        state.messageList
      );
      return newState;

    default:
      return state;
  }
};

/* state selectors */
const getStateMessageList = state => state.messageReducer.messageList;

/* derived data selectors */
const getMessageList = createSelector(getStateMessageList, messageList =>
  messageList.map(message => {
    const newMessage = { ...message };
    newMessage.imageType = false;
    newMessage.textType = false;
    newMessage.audioType = false;
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
    return newMessage;
  })
);

export { getMessageList };
