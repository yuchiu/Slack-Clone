import constants from "@/constants";

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
