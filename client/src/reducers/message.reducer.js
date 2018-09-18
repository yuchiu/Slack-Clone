import constants from "@/constants";

const initialState = {
  messageList: [],
  hasMoreMessage: true,
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_CHANNEL_ASSOCIATED_LIST:
      if (action.payload.messageList.length < 1) {
        newState.hasMoreMessage = false;
      }
      newState.messageList = action.payload.messageList;
      newState.error = "";
      return newState;

    case constants.MESSAGE_RECEIVED:
      if (
        action.payload.message.channelId === action.payload.currentChannel.id
      ) {
        newState.messageList = state.messageList.concat(action.payload.message);
        newState.error = "";
      }
      return newState;

    case constants.CLEAR_SOCKET_CONNECTION:
      newState.messageList = [];
      newState.error = "";
      return newState;

    case constants.FETCH_MORE_MESSAGE:
      if (action.payload.messageList < 30) {
        newState.hasMoreMessage = false;
      }
      newState.messageList = action.payload.messageList.concat(
        state.messageList
      );
      newState.error = "";
      return newState;

    case constants.MESSAGE_ERROR:
      newState.error = action.payload.error;
      return newState;
    default:
      return state;
  }
};
